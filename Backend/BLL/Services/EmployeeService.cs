using AutoMapper;
using BLL.DTOs.Employee;
using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using BLL.Utils;
using BlobStorage.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;

namespace BLL.Services
{
    public class EmployeeService(IEmployeeRepository employeeRepository, IUserRepository userRepository, IAuthService authService, IBlobStorage blobStorage, IMapper mapper) : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository = employeeRepository;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IAuthService _authService = authService;
        private readonly IBlobStorage _blobStorage = blobStorage;
        private readonly IMapper _mapper = mapper;

        public async Task<IList<EmployeeResponseDTO>> GetEmployees(string userId, string userRole)
        {
            IList<EmployeeEntity> employee;
            if (Helpers.CompareEnumDisplayName(userRole, UserRole.SuperAdmin))
                employee = await _employeeRepository.GetEmployeeEntities(UserRole.Employee);
            else
                employee = await _employeeRepository.GetEmployeeEntities(UserRole.Employee, userId);
            return _mapper.Map<IList<EmployeeResponseDTO>>(employee);
        }

        public async Task<IList<EmployeeResponseDTO>> GetEmployeesByFishFarm(Guid fishFarmId, string userId, string userRole)
        {
            if (userRole != "SuperAdmin")
                await _authService.CheckFishFarmAccess(fishFarmId, userId, PermissionLevel.Read);
            var employee = await _employeeRepository.GetEmployeeEntities(fishFarmId, UserRole.Employee);
            return _mapper.Map<IList<EmployeeResponseDTO>>(employee);
        }
                    
        public async Task<EmployeeResponseDTO> GetEmployeeById(string employeeId, string userId, string userRole)
        {
            EmployeeEntity? employee = await _employeeRepository.GetEmployeeEntityById(employeeId);
            if (employee is null)
                throw new KeyNotFoundException($"Employee with id {employeeId} not found");
            return _mapper.Map<EmployeeResponseDTO>(employee);
        }

        //public async Task<EmployeeResponseDTO> AddEmployee(EmployeeRequestDTO employee, Guid fishFarmId, string userId, string userRole)
        //{
        //    var employeeEntity = _mapper.Map<EmployeeEntity>(employee);
        //    var addedEmployee = await _employeeRepository.AddEmployeeEntity(employeeEntity);
        //    if (employee.Image != null)
        //    {
        //        await _blobStorage.DeleteFile("employee-images", addedEmployee.Id);
        //        var imageURL = await _blobStorage.UploadFile("employee-images", addedEmployee.Id, employee.Image.OpenReadStream());
        //        addedEmployee.ImageURL = imageURL;
        //        addedEmployee = await _employeeRepository.UpdateEmployeeEntity(addedEmployee);
        //    }
        //    return _mapper.Map<EmployeeResponseDTO>(addedEmployee);
        //}

        public async Task<EmployeeResponseDTO> UpdateEmployee(EmployeeRequestDTO employee, string employeeId)
        {
            var employeeEntity = _mapper.Map<EmployeeEntity>(employee);
            employeeEntity.Id = employeeId;
            if (employee.Image != null)
            {
                await _blobStorage.DeleteFile("employee-images", employeeId);
                var imageURL = await _blobStorage.UploadFile("employee-images", employeeId, employee.Image.OpenReadStream());
                employeeEntity.ImageURL = imageURL;
            }
            var updatedEmployee = await _employeeRepository.UpdateEmployeeEntity(employeeEntity);
            if (updatedEmployee is null)
                throw new KeyNotFoundException($"Employee with id {employeeId} not found");
            return _mapper.Map<EmployeeResponseDTO>(updatedEmployee);
        }

        public async Task<EmployeeResponseDTO> DeleteEmployee(string employeeId)
        {
            var deletedEmployee = await _employeeRepository.DeleteEmployeeEntity(employeeId);
            if (deletedEmployee is null)
                throw new KeyNotFoundException($"Employee with id {employeeId} not found");
            var user = await _userRepository.GetUserByEmployeeId(deletedEmployee.Id);
            await _userRepository.DeleteUser(user!.Id);
            return _mapper.Map<EmployeeResponseDTO>(deletedEmployee);
        }

        public async Task<FishFarmUserDTO> AddEmployeeToFishFarm(string employeeId, Guid fishFarmId)
        {
            var user = await _userRepository.GetUserByEmployeeId(employeeId);
            if (user is null)
                throw new KeyNotFoundException($"User with employee id {employeeId} not found");
            if (user.Role != UserRole.Employee)
                throw new InvalidOperationException("This user is not an employee");
            var check = await _userRepository.GetFishFarmUser(fishFarmId, user.Id);
            if (check != null)
                throw new ArgumentException($"User with id {user.Id} already exists in fish farm with id {fishFarmId}");
            var fishFarmUser = await _userRepository.AddUserToFishFarm(fishFarmId, user.Id, (int)PermissionLevel.Read);
            return _mapper.Map<FishFarmUserDTO>(fishFarmUser);
        }

        public async Task<FishFarmUserDTO> RemoveEmployeeFromFishFarm(string employeeId, Guid fishFarmId)
        {
            var user = await _userRepository.GetUserByEmployeeId(employeeId);
            if (user is null)
                throw new KeyNotFoundException($"User with employee id {employeeId} not found");
            if (user.Role != UserRole.Employee)
                throw new InvalidOperationException("This user is not an employee");
            var fishFarmUser = await _userRepository.RemoveUserFromFishFarm(fishFarmId, user.Id);
            if (fishFarmUser is null)
                throw new KeyNotFoundException($"User with id {user.Id} not found in fish farm with id {fishFarmId}");
            return _mapper.Map<FishFarmUserDTO>(fishFarmUser);
        }

        public async Task<IList<EmployeeResponseDTO>> GetUnassignedEmployeesToFishFarm(Guid fishFarmId)
        {
            var employees = await _employeeRepository.GetUnassignedEmployeesToFishFarm(fishFarmId, UserRole.Employee);
            return _mapper.Map<IList<EmployeeResponseDTO>>(employees);
        }
    }
}
