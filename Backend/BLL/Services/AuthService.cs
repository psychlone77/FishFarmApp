using AutoMapper;
using BLL.AppConfigManager;
using BLL.DTOs.Employee;
using BLL.DTOs.User;
using BLL.Services.Interfaces;
using BLL.Utils;
using BlobStorage.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.AspNetCore.Identity;

namespace BLL.Services
{
    public class AuthService(IFishFarmRepository fishFarmRepository, IUserRepository userRepository, IEmployeeRepository employeeRepository, IUserSessionRepository userSessionRepository, IBlobStorage blobStorage, TokenProvider tokenProvider, IAppConfigManager configManager, IMapper mapper) : IAuthService
    {
        private readonly IFishFarmRepository _fishFarmRepository = fishFarmRepository;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IEmployeeRepository _employeeRepository = employeeRepository;
        private readonly IUserSessionRepository _userSessionRepository = userSessionRepository;
        private readonly IBlobStorage _blobStorage = blobStorage;
        private readonly TokenProvider _tokenProvider = tokenProvider;
        private readonly string _containerName = configManager.GetEmployeeContainerName();
        private readonly int _failedLoginAttempts = int.Parse(configManager.GetFailedLoginAttempts());
        private readonly int _lockoutTime = int.Parse(configManager.GetLockoutTime());
        private readonly IMapper _mapper = mapper;

        public async Task<LoginSuccess<EmployeeResponseDTO>> EmployeeLogin(LoginRequest loginRequest)
        {
            var user = await _userRepository.GetUserByEmail(loginRequest.Email);
            if (user == null)
                throw new KeyNotFoundException("Employee Email not found");
            if (user.FailedLoginAttempts >= _failedLoginAttempts && user.LastLogin > DateTime.UtcNow.AddHours(_lockoutTime))
                throw new AccessViolationException("User is blocked");
            var employee = await _employeeRepository.GetEmployeeEntityById(user.EmployeeId);
            if (employee == null)
                throw new KeyNotFoundException("Employee does not exist for this email");
            var passwordVerificationResult = new PasswordHasher<IdentityUser>()
                .VerifyHashedPassword(new IdentityUser(), user.PasswordHash, loginRequest.Password);
            if (passwordVerificationResult == PasswordVerificationResult.Failed)
            {
                await _userRepository.FailedLoginAttempt(user.Id);
                throw new ArgumentException("Password is incorrect");
            }
            await _userRepository.SuccessfulLogin(user.Id);
            var token = _tokenProvider.CreateToken(user);
            var (refreshToken, expTime) = _tokenProvider.CreateRefreshToken();
            var currentSession = await _userSessionRepository.GetUserSessionByUserId(user.Id);
            if (currentSession != null)
            {
                await _userSessionRepository.DeleteUserSession(currentSession);
            }
            // Store the refresh token in the UserSession table
            var userSession = new UserSessionEntity
            {
                UserId = user.Id,
                User = user,
                RefreshToken = refreshToken,
                ExpirationDate = DateTime.UtcNow.AddHours(expTime)
            };
            await _userSessionRepository.CreateUserSession(userSession);
            return new LoginSuccess<EmployeeResponseDTO>
            {
                Token = token,
                RefreshToken = refreshToken,
                Email = user.Email,
                Role = user.Role.ToString(),
                UserData = _mapper.Map<EmployeeResponseDTO>(employee)
            };
        }

        public async Task<EmployeeResponseDTO> EmployeeRegister(EmployeeRegisterDTO registerRequest, UserRole userRole)
        {
            var check = await _userRepository.GetUserByEmail(registerRequest.Email);
            if (check != null)
                throw new ArgumentException("User with this email already exists");
            var hashedPassword = new PasswordHasher<IdentityUser>().HashPassword(new IdentityUser(), registerRequest.Password);
            var addEmployee = _mapper.Map<EmployeeEntity>(registerRequest);
            var userEntity = new UserEntity
            {
                Email = registerRequest.Email,
                PasswordHash = hashedPassword,
                Role = userRole,
                EmployeeId = addEmployee.Id,
                Employee = addEmployee
            };
            var addedUser = await _userRepository.AddUser(userEntity);
            var addedEmployee = await _employeeRepository.GetEmployeeEntityById(addedUser.EmployeeId);
            if (registerRequest.Image != null && addedEmployee != null)
            {
                await _blobStorage.DeleteFile(_containerName, addedEmployee.Id);
                var imageURL = await _blobStorage.UploadFile(_containerName, addedEmployee.Id, registerRequest.Image.OpenReadStream());
                addedEmployee.ImageURL = imageURL;
                addedEmployee = await _employeeRepository.UpdateEmployeeEntity(addedEmployee);
            }
            return _mapper.Map<EmployeeResponseDTO>(addedEmployee);
        }

        public async Task<UserResponse<EmployeeResponseDTO>> GetMyDetails(Guid userId)
        {
            var user = await _userRepository.GetUserById(userId);
            if (user == null)
                throw new KeyNotFoundException("User not found");
            var employee = await _employeeRepository.GetEmployeeEntityById(user.EmployeeId);
            if (employee == null)
                throw new KeyNotFoundException("Employee not found");
            return new UserResponse<EmployeeResponseDTO>
            {
                User = _mapper.Map<EmployeeResponseDTO>(employee),
                Email = user.Email,
                Role = user.Role.ToString()
            };
        }

        public async Task<String> UpdateMyEmail(Guid userId, string newEmail)
        {
            var user = await _userRepository.GetUserById(userId);
            if (user == null)
                throw new KeyNotFoundException("User not found");
            var check = await _userRepository.GetUserByEmail(newEmail);
            if (check != null)
                throw new ArgumentException("User with this email already exists");
            user.Email = newEmail;
            await _userRepository.UpdateUser(user);
            return await Task.FromResult(newEmail);
        }

        public async Task UpdateMyPassword(Guid userId, string oldPassword, string newPassword)
        {
            var user = await _userRepository.GetUserById(userId);
            if (user == null)
                throw new KeyNotFoundException("User not found");
            if (newPassword.Length < 8)
                throw new ArgumentException("Password must be at least 8 characters long");
            var passwordVerificationResult = new PasswordHasher<IdentityUser>()
                .VerifyHashedPassword(new IdentityUser(), user.PasswordHash, oldPassword);
            if (passwordVerificationResult == PasswordVerificationResult.Failed)
                throw new ArgumentException("Old Password is incorrect");
            user.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(new IdentityUser(), newPassword);
            await _userRepository.UpdateUser(user);
            return;
        }

        public async Task<TokenResponse> RefreshToken(string refreshToken)
        {
            var userSession = await _userSessionRepository.GetUserSessionByRefreshToken(refreshToken);
            if (userSession == null || userSession.ExpirationDate <= DateTime.UtcNow)
            {
                throw new UnauthorizedAccessException("Invalid or expired refresh token");
            }

            var user = await _userRepository.GetUserById(userSession.UserId);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            var newAccessToken = _tokenProvider.CreateToken(user);
            var (newRefreshToken, expTime) = _tokenProvider.CreateRefreshToken();

            // Update the refresh token in the UserSession table
            userSession.RefreshToken = newRefreshToken;
            userSession.ExpirationDate = DateTime.UtcNow.AddHours(expTime);
            await _userSessionRepository.UpdateUserSession(userSession);

            return new TokenResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }

        public async Task InvalidateRefreshToken(string refreshToken)
        {
            var userSession = await _userSessionRepository.GetUserSessionByRefreshToken(refreshToken);
            if (userSession != null)
            {
                await _userSessionRepository.DeleteUserSession(userSession);
            }
        }

        public async Task CheckFishFarmAccess(Guid fishFarmId, string userId, PermissionLevel permissionLevel)
        {
            FishFarmEntity? fishFarm = await _fishFarmRepository.GetFishFarmByPermissionLevel(fishFarmId, userId, permissionLevel);
            if (fishFarm is null)
                throw new AccessViolationException($"You do not have {Helpers.GetEnumDisplayName(permissionLevel)} access to this Fish Farm");
            return;
        }

    }

}
