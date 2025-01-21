using DAL.Data;
using DAL.Entities;
using DAL.Repository.Interface;
using DAL.Utils;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class FishFarmRepository(FishFarmAppDbContext fishFarmAppDbContext) : IFishFarmRepository
    {
        private readonly FishFarmAppDbContext _fishFarmAppDbContext = fishFarmAppDbContext;
        public async Task<IList<FishFarmEntity>> GetAllFishFarmEntites(string? userId = null)
        {
            if (userId == null)
                return await _fishFarmAppDbContext.FishFarms.ToListAsync();
            return await _fishFarmAppDbContext.FishFarms
                .Where(f => f.FishFarmUsers != null && f.FishFarmUsers.Any(fu => fu.UserId == Guid.Parse(userId) && (fu.PermissionLevel & 1) == 1))
                .ToListAsync();

        }

        public async Task<FishFarmEntity?> GetFishFarmEntityById(Guid fishFarmId, string? userId = null)
        {
            if (userId == null)
                return await _fishFarmAppDbContext.FishFarms
                    .FirstOrDefaultAsync(f => f.Id == fishFarmId);
            return await _fishFarmAppDbContext.FishFarms
                .FirstOrDefaultAsync(f => f.Id == fishFarmId && f.FishFarmUsers != null && f.FishFarmUsers.Any(fu => fu.UserId == Guid.Parse(userId) && (fu.PermissionLevel & (int)PermissionLevel.Read) == (int)PermissionLevel.Read));
        }

        public async Task<FishFarmEntity> AddFishFarmEntity(FishFarmEntity fishFarm)
        {
            var addedFishFarm = await _fishFarmAppDbContext.FishFarms.AddAsync(fishFarm);
            await _fishFarmAppDbContext.SaveChangesAsync();
            return addedFishFarm.Entity;
        }

        public async Task<FishFarmEntity?> UpdateFishFarmEntity(FishFarmEntity fishFarm, string? userId = null)
        {
            var updatedFishFarm = _fishFarmAppDbContext.FishFarms.Update(fishFarm);
            if (updatedFishFarm is null)
                return null;
            await _fishFarmAppDbContext.SaveChangesAsync();
            return updatedFishFarm.Entity;
        }

        public async Task<FishFarmEntity?> DeleteFishFarmEntity(Guid fishFarmId, string? userId = null)
        {
            var fishFarm = await _fishFarmAppDbContext.FishFarms
                .FirstOrDefaultAsync(f => f.Id == fishFarmId);
            if (fishFarm is null)
                return null;
            _fishFarmAppDbContext.FishFarms.Remove(fishFarm);
            await _fishFarmAppDbContext.SaveChangesAsync();
            return fishFarm;
        }

        public async Task<FishFarmEntity?> GetFishFarmByPermissionLevel(Guid fishFarmId, string userId, PermissionLevel permissionLevel)
        {
            return await _fishFarmAppDbContext.FishFarms
                .FirstOrDefaultAsync(f => f.Id == fishFarmId && f.FishFarmUsers != null && f.FishFarmUsers.Any(fu => fu.UserId == Guid.Parse(userId) && (fu.PermissionLevel & (int)PermissionLevel.Read) == (int)PermissionLevel.Read));
        }
    }
}
