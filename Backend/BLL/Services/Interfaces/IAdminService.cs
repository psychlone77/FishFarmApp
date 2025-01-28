using BLL.DTOs.FishFarm;
using DAL.Entities;

namespace BLL.Services.Interfaces
{
    public interface IAdminService
    {
        public Task<FishFarmUserDTO> AddAdminToFishFarm(string adminId, Guid fishFarmId);
    }
}
