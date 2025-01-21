using DAL.Entities;

namespace DAL.Repository.Interface
{
    public interface IFishFarmRepository
    {
        Task<IList<FishFarmEntity>> GetAllFishFarmEntites(string? userId = null);
        Task<FishFarmEntity?> GetFishFarmEntityById(Guid fishFarmId, string? userId = null);
        Task<FishFarmEntity> AddFishFarmEntity(FishFarmEntity fishFarm);
        Task<FishFarmEntity?> UpdateFishFarmEntity(FishFarmEntity fishFarm, string? userId);
        Task<FishFarmEntity?> DeleteFishFarmEntity(Guid id, string? userId);
        Task<FishFarmEntity?> GetFishFarmByPermissionLevel (Guid fishfarmId, string userId, PermissionLevel permissionLevel);
    }
}
