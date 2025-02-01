using BLL.DTOs.Employee;
using BLL.DTOs.FishFarm;
using DAL.Entities;

namespace BLL.Services.Interfaces
{
    public interface IAdminService
    {
        public Task<IList<EmployeeResponseDTO>> GetAdmins();
        public Task<IList<EmployeeResponseDTO>> GetAdmins(Guid fishFarmId);
        public Task<FishFarmUserDTO> AddAdminToFishFarm(string adminId, Guid fishFarmId);
        public Task<FishFarmUserDTO> RemoveAdminFromFishFarm(string adminId, Guid fishFarmId);
        public Task<IList<EmployeeResponseDTO>> GetUnassignedAdminsToFishFarm(Guid fishFarmId);
    }
}
