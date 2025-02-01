using BLL.DTOs.Employee;
using BLL.DTOs.FishFarm;
using DAL.Entities;

namespace BLL.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<IList<EmployeeResponseDTO>> GetEmployees();
        Task<IList<EmployeeResponseDTO>> GetEmployeesByFishFarm(Guid fishFarmId, string userId, string userRole);
        Task<EmployeeResponseDTO> GetEmployeeById(string employeeId, string userId, string userRole);
        Task<IList<FishFarmUserDTO>> GetFishFarmsByEmployee(string employeeId);
        Task<EmployeeResponseDTO> UpdateEmployee(EmployeeRequestDTO employee, string employeeId);
        Task<EmployeeResponseDTO> DeleteEmployee(string employeeId);
        Task<FishFarmUserDTO> AddEmployeeToFishFarm(string employeeId, Guid fishFarmId);
        Task<FishFarmUserDTO> RemoveEmployeeFromFishFarm(string employeeId, Guid fishFarmId);
        Task<IList<EmployeeResponseDTO>> GetUnassignedEmployeesToFishFarm(Guid fishFarmId);
    }
}
