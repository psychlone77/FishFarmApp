using BLL.DTOs.FishFarm;
namespace BLL.Services.Interfaces
{
    public interface IFishFarmsService
    {
        Task<IList<FishFarmResponseDTO>> GetAllFishFarms(string userId);
        Task<FishFarmResponseDTO> GetFishFarmById(Guid fishFarmId, string userId);
        Task<FishFarmResponseDTO> AddFishFarm(FishFarmRequestDTO fishFarm, string userId);
        Task<FishFarmResponseDTO> UpdateFishFarm(FishFarmRequestDTO fishFarm, Guid fishFarmId, string userId);
        Task<FishFarmResponseDTO> DeleteFishFarm(Guid id, string userId);
    }
}
