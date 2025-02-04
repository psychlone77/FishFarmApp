using DAL.Data;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class BoatRepository(FishFarmAppDbContext context) : IBoatRepository
    {
        private readonly FishFarmAppDbContext _context = context;

        public async Task<IList<BoatEntity>> GetBoats(Guid fishFarmId)
        {
            return await _context.Boats.Where(b => b.FishFarmId == fishFarmId).ToListAsync();
        }

        public async Task<IList<BoatEntity>> GetAllBoats()
        {
            return await _context.Boats
                .Include(b => b.FishFarm)
                .ToListAsync();
        }

        public async Task<IList<BoatEntity>> GetAllBoats(Guid userId)
        {
            return await _context.Boats
                .Include(b => b.FishFarm)
                .Where(b => b.FishFarm != null && b.FishFarm.FishFarmUsers != null && b.FishFarm.FishFarmUsers
                .Any(fu => fu.UserId == userId && (fu.PermissionLevel & (int)PermissionLevel.Read) == (int)PermissionLevel.Read))
                .ToListAsync();
        }

        public async Task<BoatEntity?> GetBoat(string boatId)
        {
            return await _context.Boats.FirstOrDefaultAsync(b => b.Id == boatId);
        }

        public async Task<BoatEntity> AddBoat(BoatEntity boatEntity)
        {
            _context.Boats.Add(boatEntity);
            await _context.SaveChangesAsync();
            return boatEntity;
        }

        public async Task<BoatEntity> UpdateBoat(BoatEntity boatEntity)
        {
            _context.Boats.Update(boatEntity);
            await _context.SaveChangesAsync();
            return boatEntity;
        }

        public async Task<BoatEntity> DeleteBoat(string boatId)
        {
            var boat = await _context.Boats.FirstOrDefaultAsync(b => b.Id == boatId);
            if (boat == null)
                throw new KeyNotFoundException("Boat not found");
            _context.Boats.Remove(boat);
            await _context.SaveChangesAsync();
            return boat;
        }
    }
}
