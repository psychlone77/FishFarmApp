using AutoMapper;
using BLL.DTOs.Employee;
using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;

namespace BLL.Services
{
    public class AdminService(IEmployeeRepository employeeRepository, IUserRepository userRepository, IMapper mapper) : IAdminService
    {
        private readonly IEmployeeRepository _employeeRepository = employeeRepository;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IList<EmployeeResponseDTO>> GetAdmins()
        {
            var admins = await _employeeRepository.GetEmployeeEntities(UserRole.Admin);
            return _mapper.Map<IList<EmployeeResponseDTO>>(admins);
        }

        public async Task<IList<EmployeeResponseDTO>> GetAdmins(Guid fishFarmId)
        {
            var admins = await _employeeRepository.GetEmployeeEntities(fishFarmId, UserRole.Admin);
            return _mapper.Map<IList<EmployeeResponseDTO>>(admins);
        }

        public async Task<FishFarmUserDTO> AddAdminToFishFarm(string employeeId, Guid fishFarmId)
        {
            var user = await _userRepository.GetUserByEmployeeId(employeeId);
            if (user is null)
                throw new KeyNotFoundException($"User with employee id {employeeId} not found");
            if (user.Role != UserRole.Admin)
                throw new InvalidOperationException("This user is not an admin");
            var fishFarmUser = await _userRepository.
                AddUserToFishFarm(fishFarmId, user.Id, (int)PermissionLevel.Read | (int)PermissionLevel.Write);
            return _mapper.Map<FishFarmUserDTO>(fishFarmUser);
        }

        public async Task<FishFarmUserDTO> RemoveAdminFromFishFarm(string employeeId, Guid fishFarmId)
        {
            var user = await _userRepository.GetUserByEmployeeId(employeeId);
            if (user is null)
                throw new KeyNotFoundException($"User with employee id {employeeId} not found");
            if (user.Role != UserRole.Admin)
                throw new InvalidOperationException("This user is not an admin");
            var fishFarmUser = await _userRepository.RemoveUserFromFishFarm(fishFarmId, user.Id);
            return _mapper.Map<FishFarmUserDTO>(fishFarmUser);
        }

        public async Task<IList<EmployeeResponseDTO>> GetUnassignedAdminsToFishFarm(Guid fishFarmId)
        {
            var employees = await _employeeRepository.GetUnassignedEmployeesToFishFarm(fishFarmId, UserRole.Admin);
            return _mapper.Map<IList<EmployeeResponseDTO>>(employees);
        }
    }
}
