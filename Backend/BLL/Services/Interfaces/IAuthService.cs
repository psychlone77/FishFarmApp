using BLL.DTOs.Employee;
using BLL.DTOs.User;

namespace BLL.Services.Interfaces
{
    public interface IAuthService
    {
        public Task<LoginSuccess<EmployeeResponseDTO>> EmployeeLogin(LoginRequest loginRequest);
        public Task<EmployeeResponseDTO> EmployeeRegister(EmployeeRegisterDTO registerRequest);
    }
}
