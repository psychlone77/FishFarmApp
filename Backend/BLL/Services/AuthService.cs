﻿using AutoMapper;
using BLL.DTOs.Employee;
using BLL.DTOs.User;
using BLL.Services.Interfaces;
using BlobStorage.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.AspNetCore.Identity;

namespace BLL.Services
{
    public class AuthService(IFishFarmRepository fishFarmRepository, IUserRepository userRepository, IEmployeeRepository employeeRepository, IBlobStorage blobStorage, TokenProvider tokenProvider, IMapper mapper) : IAuthService
    {
        private readonly IFishFarmRepository _fishFarmRepository = fishFarmRepository;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IEmployeeRepository _employeeRepository = employeeRepository;
        private readonly IBlobStorage _blobStorage = blobStorage;
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
                await _blobStorage.DeleteFile("employee-images", addedEmployee.Id);
                var imageURL = await _blobStorage.UploadFile("employee-images", addedEmployee.Id, registerRequest.Image.OpenReadStream());
                addedEmployee.ImageURL = imageURL;
                addedEmployee = await _employeeRepository.UpdateEmployeeEntity(addedEmployee);
            }
            return _mapper.Map<EmployeeResponseDTO>(addedEmployee);
        }

        public async Task<EmployeeResponseDTO> GetMyDetails(Guid userId)
        {
            var user = await _userRepository.GetUserById(userId);
            if (user == null)
                throw new KeyNotFoundException("User not found");
            var employee = await _employeeRepository.GetEmployeeEntityById(user.EmployeeId);
            if (employee == null)
                throw new KeyNotFoundException("Employee not found");
            return _mapper.Map<EmployeeResponseDTO>(employee);
        }

        public async Task CheckFishFarmAccess(Guid fishFarmId, string userId, PermissionLevel permissionLevel)
        {
            FishFarmEntity? fishFarm = await _fishFarmRepository.GetFishFarmByPermissionLevel(fishFarmId, userId, permissionLevel);
            if (fishFarm is null)
                throw new AccessViolationException($"You do not have access to this Fish Farm");
            return;
        }

    }

}
