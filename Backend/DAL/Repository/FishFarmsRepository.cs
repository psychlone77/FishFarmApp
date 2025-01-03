using DAL.Data;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class FishFarmsRepository(FishFarmsDbContext fishFarmsDbContext) : IFishFarmsRepository
    {
        private readonly FishFarmsDbContext _fishFarmsDbContext = fishFarmsDbContext;
        public async Task<ICollection<FishFarmEntity>> GetAllFishFarms()
        {
            return await _fishFarmsDbContext.FishFarms.ToListAsync();
        }
    }
}
