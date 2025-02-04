using BLL.DTOs.Boat;
using DAL.Entities;

namespace BLL.Services.Interfaces
{
    public interface IBoatService
    {
        Task<IList<BoatDTO>> GetBoats(Guid fishFarmId);
        Task<IList<BoatWithFishFarmDTO>> GetAllBoats();
        Task<IList<BoatWithFishFarmDTO>> GetAllBoats(Guid userId);
        IList<string> GetBoatTypes();
        Task<BoatDTO> AddBoat(Guid fishFarmId, BoatDTO boatDTO);
        Task<BoatDTO> UpdateBoat(Guid fishFarmId, string boatId, BoatDTO boatDTO);
        Task<BoatDTO> DeleteBoat(Guid fishFarmId, string boatId);
        Task<BoatDTO> ReassignBoat(Guid fishFarmId, string boatId, Guid newFishFarmId);
    }
}
