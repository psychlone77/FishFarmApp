using BLL.DTOs.Employee;
using BLL.DTOs.User;
using DAL.Entities;

namespace BLL.Services.Interfaces
{
    public interface IAuthService
    {
        public Task<LoginSuccess<EmployeeResponseDTO>> EmployeeLogin(LoginRequest loginRequest);
        public Task<EmployeeResponseDTO> EmployeeRegister(EmployeeRegisterDTO registerRequest);
        public Task<EmployeeResponseDTO> AdminRegister(EmployeeRegisterDTO registerRequest);
        public Task CheckFishFarmAccess(Guid fishFarmId, string userId, PermissionLevel permissionLevel);
    }
}
