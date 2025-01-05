using DAL.Data;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class FishFarmsRepository(FishFarmsDbContext fishFarmsDbContext) : IFishFarmsRepository
    {
        private readonly FishFarmsDbContext _fishFarmsDbContext = fishFarmsDbContext;
        public async Task<IList<FishFarmEntity>> GetAllFishFarmEntites()
        {
            return await _fishFarmsDbContext.FishFarms.ToListAsync();
        }

        public async Task<FishFarmEntity?> GetFishFarmEntityById(Guid id)
        {
            return await _fishFarmsDbContext.FishFarms.FindAsync(id);
        }

        public async Task<FishFarmEntity> AddFishFarmEntity(FishFarmEntity fishFarm)
        {
            var addedFishFarm = await _fishFarmsDbContext.FishFarms.AddAsync(fishFarm);
            await _fishFarmsDbContext.SaveChangesAsync();
            return addedFishFarm.Entity;
        }

        public async Task<FishFarmEntity> UpdateFishFarmEntity(FishFarmEntity fishFarm)
        {
            var updatedFishFarm = _fishFarmsDbContext.FishFarms.Update(fishFarm);
            if (updatedFishFarm is null)
                return null;
            await _fishFarmsDbContext.SaveChangesAsync();
            return updatedFishFarm.Entity;
        }

        public async Task<FishFarmEntity?> DeleteFishFarmEntity(Guid id)
        {
            var fishFarm = await _fishFarmsDbContext.FishFarms.FindAsync(id);
            if (fishFarm is null)
                return null;
            _fishFarmsDbContext.FishFarms.Remove(fishFarm);
            await _fishFarmsDbContext.SaveChangesAsync();
            return fishFarm;
        }
    }
}
