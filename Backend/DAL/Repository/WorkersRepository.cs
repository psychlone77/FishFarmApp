using DAL.Data;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class WorkersRepository(FishFarmAppDbContext context) : IWorkersRepository
    {
        private readonly FishFarmAppDbContext _context = context;

        public async Task<IList<EmployeeEntity>> GetWorkerEntities(Guid fishFarmId)
        {
            return await _context.Employees.Where(w => w.FishFarmId == fishFarmId).ToListAsync();
        }

        public async Task<EmployeeEntity?> GetWorkerEntityById(Guid workerId)
        {
            return await _context.Employees.FindAsync(workerId);
        }

        public async Task<EmployeeEntity> AddWorkerEntity(EmployeeEntity workerEntity)
        {
            var newWorkerEntity = await _context.Employees.AddAsync(workerEntity);
            await _context.SaveChangesAsync();
            return newWorkerEntity.Entity;
        }

        public async Task<EmployeeEntity?> UpdateWorkerEntity(EmployeeEntity workerEntity)
        {
            var existingWorkerEntity = await _context.Employees.FirstOrDefaultAsync(w => w.Id == workerEntity.Id);
            if (existingWorkerEntity == null)
                return null;

            existingWorkerEntity.Name = workerEntity.Name;
            existingWorkerEntity.Age = workerEntity.Age;
            existingWorkerEntity.ImageURL = workerEntity.ImageURL;
            existingWorkerEntity.Email = workerEntity.Email;
            existingWorkerEntity.WorkerPosition = workerEntity.WorkerPosition;
            existingWorkerEntity.CertifiedUntil = workerEntity.CertifiedUntil;

            await _context.SaveChangesAsync();
            return existingWorkerEntity;
        }

        public async Task<EmployeeEntity?> DeleteWorkerEntity(Guid workerId)
        {
            string workerIdString = workerId.ToString();
            var workerEntity = await _context.Employees.FirstOrDefaultAsync(w => w.Id == workerIdString);
            if (workerEntity == null)
                return null;
            _context.Employees.Remove(workerEntity);
            await _context.SaveChangesAsync();
            return workerEntity;
        }
    }
}
