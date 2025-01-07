using DAL.Data;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class FishFarmsRepository(FishFarmsDbContext fishFarmsDbContext) : IFishFarmsRepository
    {
        private readonly FishFarmsDbContext _fishFarmsDbContext = fishFarmsDbContext;
        public async Task<IList<FishFarmEntity>> GetAllFishFarmEntites(string userId)
        {
            return await _fishFarmsDbContext.FishFarms
                .Where(f => f.UserId == userId).ToListAsync();
        }

        public async Task<FishFarmEntity?> GetFishFarmEntityById(Guid fishFarmId, string userId)
        {
            return await _fishFarmsDbContext.FishFarms
                .FirstOrDefaultAsync(f => f.Id == fishFarmId && f.UserId == userId);
        }

        public async Task<FishFarmEntity> AddFishFarmEntity(FishFarmEntity fishFarm, string userId)
        {
            fishFarm.UserId = userId;
            var addedFishFarm = await _fishFarmsDbContext.FishFarms.AddAsync(fishFarm);
            await _fishFarmsDbContext.SaveChangesAsync();
            return addedFishFarm.Entity;
        }

        public async Task<FishFarmEntity?> UpdateFishFarmEntity(FishFarmEntity fishFarm, string userId)
        {
            fishFarm.UserId = userId;
            var updatedFishFarm = _fishFarmsDbContext.FishFarms.Update(fishFarm);
            if (updatedFishFarm is null)
                return null;
            await _fishFarmsDbContext.SaveChangesAsync();
            return updatedFishFarm.Entity;
        }

        public async Task<FishFarmEntity?> DeleteFishFarmEntity(Guid fishFarmId, string userId)
        {
            var fishFarm = await _fishFarmsDbContext.FishFarms
                .FirstOrDefaultAsync(f => f.Id == fishFarmId && f.UserId == userId);
            if (fishFarm is null)
                return null;
            _fishFarmsDbContext.FishFarms.Remove(fishFarm);
            await _fishFarmsDbContext.SaveChangesAsync();
            return fishFarm;
        }
    }
}
