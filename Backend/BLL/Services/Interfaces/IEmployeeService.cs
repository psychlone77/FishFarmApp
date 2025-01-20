using BLL.DTOs.Employee;

namespace BLL.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<IList<EmployeeResponseDTO>> GetEmployees(Guid fishFarmId, string userId);
        Task<EmployeeResponseDTO> GetEmployeeById(Guid worker, string userId);
        Task<EmployeeResponseDTO> AddEmployee(EmployeeRequestDTO worker, Guid fishFarmId, string userId);
        Task<EmployeeResponseDTO> UpdateEmployee(EmployeeRequestDTO worker, Guid workerId, string userId);
        Task<EmployeeResponseDTO> DeleteEmployee(Guid workerId, string userId);
    }
}
