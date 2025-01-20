using DAL.Data;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class FishFarmRepository(FishFarmAppDbContext fishFarmAppDbContext) : IFishFarmRepository
    {
        private readonly FishFarmAppDbContext _fishFarmAppDbContext = fishFarmAppDbContext;
        public async Task<IList<FishFarmEntity>> GetAllFishFarmEntites(string userId)
        {
            return await _fishFarmAppDbContext.FishFarms.ToListAsync();
        }

        public async Task<FishFarmEntity?> GetFishFarmEntityById(Guid fishFarmId, string userId)
        {
            return await _fishFarmAppDbContext.FishFarms
                .FirstOrDefaultAsync(f => f.Id == fishFarmId);
        }

        public async Task<FishFarmEntity> AddFishFarmEntity(FishFarmEntity fishFarm, string userId)
        {
            var addedFishFarm = await _fishFarmAppDbContext.FishFarms.AddAsync(fishFarm);
            await _fishFarmAppDbContext.SaveChangesAsync();
            return addedFishFarm.Entity;
        }

        public async Task<FishFarmEntity?> UpdateFishFarmEntity(FishFarmEntity fishFarm, string userId)
        {
            var updatedFishFarm = _fishFarmAppDbContext.FishFarms.Update(fishFarm);
            if (updatedFishFarm is null)
                return null;
            await _fishFarmAppDbContext.SaveChangesAsync();
            return updatedFishFarm.Entity;
        }

        public async Task<FishFarmEntity?> DeleteFishFarmEntity(Guid fishFarmId, string userId)
        {
            var fishFarm = await _fishFarmAppDbContext.FishFarms
                .FirstOrDefaultAsync(f => f.Id == fishFarmId);
            if (fishFarm is null)
                return null;
            _fishFarmAppDbContext.FishFarms.Remove(fishFarm);
            await _fishFarmAppDbContext.SaveChangesAsync();
            return fishFarm;
        }
    }
}
