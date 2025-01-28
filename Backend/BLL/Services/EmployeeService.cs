using AutoMapper;
using BLL.DTOs.Employee;
using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;

namespace BLL.Services
{
    public class EmployeeService(IEmployeeRepository employeeRepository, IUserRepository userRepository, IAuthService authService, IMapper mapper) : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository = employeeRepository;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IAuthService _authService = authService;
        private readonly IMapper _mapper = mapper;

        public async Task<IList<EmployeeResponseDTO>> GetEmployees(Guid fishFarmId, string userId, string userRole)
        {
            if (userRole != "SuperAdmin")
                await _authService.CheckFishFarmAccess(fishFarmId, userId, PermissionLevel.Read);
            var employee = await _employeeRepository.GetEmployeeEntities(fishFarmId);
            return _mapper.Map<IList<EmployeeResponseDTO>>(employee);
        }
                    
        public async Task<EmployeeResponseDTO> GetEmployeeById(string employeeId, string userId, string userRole)
        {
            EmployeeEntity? employee = await _employeeRepository.GetEmployeeEntityById(employeeId);
            if (employee is null)
                throw new KeyNotFoundException($"Employee with id {employeeId} not found");
            return _mapper.Map<EmployeeResponseDTO>(employee);
        }

        public async Task<EmployeeResponseDTO> AddEmployee(EmployeeRequestDTO employee, Guid fishFarmId, string userId, string userRole)
        {
            var employeeEntity = _mapper.Map<EmployeeEntity>(employee);
            var addedEmployee = await _employeeRepository.AddEmployeeEntity(employeeEntity);
            return _mapper.Map<EmployeeResponseDTO>(addedEmployee);
        }

        public async Task<EmployeeResponseDTO> UpdateEmployee(EmployeeRequestDTO employee, string employeeId)
        {
            var employeeEntity = _mapper.Map<EmployeeEntity>(employee);
            employeeEntity.Id = employeeId.ToString();
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
            var employees = await _employeeRepository.GetEmployeeEntities();
            var unassignedEmployees = employees
                .Where(e => e.User != null &&
                            (e.User.FishFarmUsers == null ||
                             e.User.FishFarmUsers.All(fu => fu.FishFarmId != fishFarmId)));
            return _mapper.Map<IList<EmployeeResponseDTO>>(unassignedEmployees);
        }
    }
}
