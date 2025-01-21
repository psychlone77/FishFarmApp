using DAL.Entities;

namespace DAL.Repository.Interface
{
    public interface IEmployeeRepository
    {
        Task<IList<EmployeeEntity>> GetEmployeeEntities(Guid fishFarmId);
        Task<EmployeeEntity?> GetEmployeeEntityById(string employeeId);
        Task<EmployeeEntity> AddEmployeeEntity(EmployeeEntity employeeEntity);
        Task<EmployeeEntity?> UpdateEmployeeEntity(EmployeeEntity employeeEntity);
        Task<EmployeeEntity?> DeleteEmployeeEntity(string employeeId);
    }
}
