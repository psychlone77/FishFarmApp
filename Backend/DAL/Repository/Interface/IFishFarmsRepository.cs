using DAL.Entities;

namespace DAL.Repository.Interface
{
    public interface IFishFarmsRepository
    {
        Task<IList<FishFarmEntity>> GetAllFishFarmEntites();
        Task<FishFarmEntity?> GetFishFarmEntityById(Guid id);
        Task<FishFarmEntity> AddFishFarmEntity(FishFarmEntity fishFarm);
        Task<FishFarmEntity?> UpdateFishFarmEntity(FishFarmEntity fishFarm);
        Task<FishFarmEntity?> DeleteFishFarmEntity(Guid id);
    }
}
