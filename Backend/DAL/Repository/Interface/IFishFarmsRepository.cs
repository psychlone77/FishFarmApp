using DAL.Entities;

namespace DAL.Repository.Interface
{
    public interface IFishFarmsRepository
    {
        Task<IList<FishFarmEntity>> GetAllFishFarmEntites(string userId);
        Task<FishFarmEntity?> GetFishFarmEntityById(Guid fishFarmId, string userId);
        Task<FishFarmEntity> AddFishFarmEntity(FishFarmEntity fishFarm, string userId);
        Task<FishFarmEntity?> UpdateFishFarmEntity(FishFarmEntity fishFarm, string userId);
        Task<FishFarmEntity?> DeleteFishFarmEntity(Guid id, string userId);
    }
}
