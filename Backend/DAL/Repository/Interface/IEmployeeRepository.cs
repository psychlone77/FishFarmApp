using DAL.Entities;

namespace DAL.Repository.Interface
{
    public interface IEmployeeRepository
    {
        Task<IList<EmployeeEntity>> GetEmployeeEntities(UserRole userRole);
        Task<IList<EmployeeEntity>> GetEmployeeEntities(UserRole userRole, string userId);
        Task<IList<EmployeeEntity>> GetEmployeeEntities(Guid fishFarmId, UserRole userRole);
        Task<EmployeeEntity?> GetEmployeeEntityById(string employeeId);
        Task<IList<EmployeeEntity>> GetUnassignedEmployeesToFishFarm(Guid fishFarmId, UserRole userRole);
        Task<EmployeeEntity> AddEmployeeEntity(EmployeeEntity employeeEntity);
        Task<EmployeeEntity?> UpdateEmployeeEntity(EmployeeEntity employeeEntity);
        Task<EmployeeEntity?> DeleteEmployeeEntity(string employeeId);
    }
}
