using DAL.Entities;
namespace BLL.Services.Interfaces
{
    public interface IFishFarmsService
    {
        Task<ICollection<FishFarmEntity>> GetAllFishFarms();
    }
}
