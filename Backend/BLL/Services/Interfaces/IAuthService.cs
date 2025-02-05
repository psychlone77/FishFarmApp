using BLL.DTOs.Employee;
using BLL.DTOs.User;
using DAL.Entities;
using Microsoft.AspNetCore.Http;

namespace BLL.Services.Interfaces
{
    public interface IAuthService
    {
        public Task<LoginSuccess<EmployeeResponseDTO>> EmployeeLogin(LoginRequest loginRequest);
        public Task<EmployeeResponseDTO> EmployeeRegister(EmployeeRegisterDTO registerRequest, UserRole userRole);
        public Task<UserResponse<EmployeeResponseDTO>> GetMyDetails(Guid userId);
        public Task<String> UpdateMyEmail(Guid userId, string newEmail);
        public Task UpdateMyPassword(Guid userId, string oldPassword, string newPassword);
        public Task<String> UpdateMyProfilePicture(Guid userId, IFormFile image);
        public Task<TokenResponse> RefreshToken(string refreshToken);
        public Task InvalidateRefreshToken(string refreshToken);
        public Task CheckFishFarmAccess(Guid fishFarmId, string userId, PermissionLevel permissionLevel);
    }
}
