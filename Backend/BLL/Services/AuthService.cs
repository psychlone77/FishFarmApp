using AutoMapper;
using BLL.DTOs.Employee;
using BLL.DTOs.User;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.AspNetCore.Identity;

namespace BLL.Services
{
    public class AuthService(IUserRepository userRepository, IEmployeeRepository employeeRepository, TokenProvider tokenProvider, IMapper mapper) : IAuthService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IEmployeeRepository _employeeRepository = employeeRepository;
        private readonly TokenProvider _tokenProvider = tokenProvider;
        private readonly IMapper _mapper = mapper;

        public async Task<LoginSuccess<EmployeeResponseDTO>> EmployeeLogin(LoginRequest loginRequest)
        {
            var user = await _userRepository.GetUserByEmail(loginRequest.Email);
            if (user == null)
                throw new KeyNotFoundException("Employee Email not found");
            if (user.FailedLoginAttempts >= 5 && user.LastLogin > DateTime.UtcNow.AddHours(-1))
                throw new UnauthorizedAccessException("User is blocked");
            var employee = await _employeeRepository.GetEmployeeEntityById(user.EmployeeId);
            if (employee == null)
                throw new KeyNotFoundException("Employee does not exist for this email");
            var passwordVerificationResult = new PasswordHasher<IdentityUser>()
                .VerifyHashedPassword(new IdentityUser(), user.PasswordHash, loginRequest.Password);
            if (passwordVerificationResult == PasswordVerificationResult.Failed)
            {
                await _userRepository.FailedLoginAttempt(user.Id);
                throw new UnauthorizedAccessException("Password is incorrect");
            }
            await _userRepository.SuccessfulLogin(user.Id);
            var token = _tokenProvider.CreateToken(user);
            return new LoginSuccess<EmployeeResponseDTO>
            {
                Token = token,
                UserData = _mapper.Map<EmployeeResponseDTO>(employee)
            };
        }

        public async Task<EmployeeResponseDTO> EmployeeRegister(EmployeeRegisterDTO registerRequest)
        {
            var hashedPassword = new PasswordHasher<IdentityUser>().HashPassword(new IdentityUser(), registerRequest.Password);
            var addEmployee = _mapper.Map<EmployeeEntity>(registerRequest);
            var userEntity = new UserEntity
            {
                Email = registerRequest.Email,
                PasswordHash = hashedPassword,
                Role = UserRole.Employee,
                EmployeeId = addEmployee.Id,
                Employee = addEmployee
            };
            var addedUser = await _userRepository.AddUser(userEntity);
            return _mapper.Map<EmployeeResponseDTO>(addEmployee);
        }

        public async Task<EmployeeResponseDTO> AdminRegister(EmployeeRegisterDTO registerRequest)
        {
            var hashedPassword = new PasswordHasher<IdentityUser>().HashPassword(new IdentityUser(), registerRequest.Password);
            var addEmployee = _mapper.Map<EmployeeEntity>(registerRequest);
            var userEntity = new UserEntity
            {
                Email = registerRequest.Email,
                PasswordHash = hashedPassword,
                Role = UserRole.Admin,
                EmployeeId = addEmployee.Id,
                Employee = addEmployee
            };
            var addedUser = await _userRepository.AddUser(userEntity);
            return _mapper.Map<EmployeeResponseDTO>(addEmployee);
        }

    }

}
