using BLL.DTOs.FishFarm;
namespace BLL.Services.Interfaces
{
    public interface IFishFarmsService
    {
        Task<IList<FishFarmResponseDTO>> GetAllFishFarms();
        Task<FishFarmResponseDTO> GetFishFarmById(Guid id);
        Task<FishFarmResponseDTO> AddFishFarm(FishFarmRequestDTO fishFarm);
        Task<FishFarmResponseDTO> UpdateFishFarm(FishFarmRequestDTO fishFarm, Guid id);
        Task<FishFarmResponseDTO> DeleteFishFarm(Guid id);
    }
}
