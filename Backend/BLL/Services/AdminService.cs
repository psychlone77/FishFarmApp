using AutoMapper;
using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;

namespace BLL.Services
{
    public class AdminService(IUserRepository userRepository, IMapper mapper) : IAdminService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IMapper _mapper = mapper;

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
    }
}
