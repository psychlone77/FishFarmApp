using DAL.Entities;

namespace DAL.Repository.Interface
{
    public interface IEmployeeRepository
    {
        Task<IList<EmployeeEntity>> GetEmployeeEntities(Guid fishFarmId);
        Task<EmployeeEntity?> GetEmployeeEntityById(Guid employeeId);
        Task<EmployeeEntity?> GetEmployeeEntityByUserId(Guid userId);
        Task<EmployeeEntity> AddEmployeeEntity(EmployeeEntity employeeEntity);
        Task<EmployeeEntity?> UpdateEmployeeEntity(EmployeeEntity employeeEntity);
        Task<EmployeeEntity?> DeleteEmployeeEntity(Guid employeeId);
    }
}
