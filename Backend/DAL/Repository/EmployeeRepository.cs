using DAL.Data;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class EmployeeRepository(FishFarmAppDbContext context) : IEmployeeRepository
    {
        private readonly FishFarmAppDbContext _context = context;

        public async Task<IList<EmployeeEntity>> GetEmployeeEntities(Guid fishFarmId)
        {
            return await _context.Employees
                .Where(e => e.User != null && e.User.FishFarmUsers != null && e.User.FishFarmUsers.Any(fu => fu.FishFarmId == fishFarmId))
                .ToListAsync();
        }

        public async Task<EmployeeEntity?> GetEmployeeEntityById(string employeeId)
        {
            return await _context.Employees.FindAsync(employeeId);
        }

        public async Task<EmployeeEntity> AddEmployeeEntity(EmployeeEntity employeeEntity)
        {
            var newEmployeeEntity = await _context.Employees.AddAsync(employeeEntity);
            await _context.SaveChangesAsync();
            return newEmployeeEntity.Entity;
        }

        public async Task<EmployeeEntity?> UpdateEmployeeEntity(EmployeeEntity employeeEntity)
        {
            var existingEmployeeEntity = await _context.Employees.FirstOrDefaultAsync(w => w.Id == employeeEntity.Id);
            if (existingEmployeeEntity == null)
                return null;

            existingEmployeeEntity.Name = employeeEntity.Name;
            existingEmployeeEntity.Age = employeeEntity.Age;
            existingEmployeeEntity.ImageURL = employeeEntity.ImageURL;
            existingEmployeeEntity.EmployeePosition = employeeEntity.EmployeePosition;
            existingEmployeeEntity.CertifiedUntil = employeeEntity.CertifiedUntil;

            await _context.SaveChangesAsync();
            return existingEmployeeEntity;
        }

        public async Task<EmployeeEntity?> DeleteEmployeeEntity(string employeeId)
        {
            var employeeEntity = await _context.Employees.FirstOrDefaultAsync(w => w.Id == employeeId);
            if (employeeEntity == null)
                return null;
            employeeEntity.IsDeleted = true;
            await _context.SaveChangesAsync();
            return employeeEntity;
        }
    }
}
