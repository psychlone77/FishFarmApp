using BLL.DTOs.Employee;
using DAL.Entities;

namespace BLL.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<IList<EmployeeResponseDTO>> GetEmployees(Guid fishFarmId, string userId, string userRole);
        Task<EmployeeResponseDTO> GetEmployeeById(string employeeId, string userId, string userRole);
        Task<EmployeeResponseDTO> UpdateEmployee(EmployeeRequestDTO employee, string employeeId);
        Task<EmployeeResponseDTO> DeleteEmployee(string employeeId);
        public Task AddEmployeeToFishFarm(string employeeId, Guid fishFarmId, int permissionLevel);
    }
}
