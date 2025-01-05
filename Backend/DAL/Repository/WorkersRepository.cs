using DAL.Data;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class WorkersRepository : IWorkersRepository
    {
        private readonly FishFarmsDbContext _context;

        public WorkersRepository(FishFarmsDbContext context)
        {
            _context = context;
        }

        public async Task<IList<WorkerEntity>> GetWorkerEntities(Guid fishFarmId)
        {
            return await _context.Workers.Where(w => w.FishFarmId == fishFarmId).ToListAsync();
        }

        public async Task<WorkerEntity?> GetWorkerEntityById(Guid workerId)
        {
            return await _context.Workers.FindAsync(workerId);
        }

        public async Task<WorkerEntity> AddWorkerEntity(WorkerEntity workerEntity)
        {
            var newWorkerEntity = await _context.Workers.AddAsync(workerEntity);
            await _context.SaveChangesAsync();
            return newWorkerEntity.Entity;
        }

        public async Task<WorkerEntity?> UpdateWorkerEntity(WorkerEntity workerEntity)
        {
            var updatedWorkerEntity = _context.Workers.Update(workerEntity);
            if(updatedWorkerEntity == null)
                return null;
            await _context.SaveChangesAsync();
            return updatedWorkerEntity.Entity;
        }

        public async Task<WorkerEntity?> DeleteWorkerEntity(Guid workerId)
        {
            var workerEntity = await _context.Workers.FirstOrDefaultAsync(w => w.Id == workerId);
            if (workerEntity == null)
                return null;
            _context.Workers.Remove(workerEntity);
            await _context.SaveChangesAsync();
            return workerEntity;
        }
    }
}
