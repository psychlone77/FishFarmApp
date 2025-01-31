using BLL.DTOs.FishFarm;
namespace BLL.Services.Interfaces
{
    public interface IFishFarmsService
    {
        Task<IList<FishFarmResponseDTO>> GetAllFishFarms(string userId, string userRole);
        Task<FishFarmResponseDTO> GetFishFarmById(Guid fishFarmId, string userId, string userRole);
        Task<FishFarmResponseDTO> AddFishFarm(FishFarmRequestDTO fishFarm);
        Task<FishFarmResponseDTO> UpdateFishFarm(FishFarmRequestDTO fishFarm, Guid fishFarmId, string userId, string userRole);
        Task<FishFarmResponseDTO> DeleteFishFarm(Guid id, string userId, string userRole);
        Task<bool> HasBarge(Guid fishFarmId);
    }
}
