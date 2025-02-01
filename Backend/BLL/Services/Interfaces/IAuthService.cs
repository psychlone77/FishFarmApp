using BLL.DTOs.Employee;
using BLL.DTOs.User;
using DAL.Entities;

namespace BLL.Services.Interfaces
{
    public interface IAuthService
    {
        public Task<LoginSuccess<EmployeeResponseDTO>> EmployeeLogin(LoginRequest loginRequest);
        public Task<EmployeeResponseDTO> EmployeeRegister(EmployeeRegisterDTO registerRequest, UserRole userRole);
        public Task<EmployeeResponseDTO> GetMyDetails(Guid userId);
        public Task CheckFishFarmAccess(Guid fishFarmId, string userId, PermissionLevel permissionLevel);
    }
}
