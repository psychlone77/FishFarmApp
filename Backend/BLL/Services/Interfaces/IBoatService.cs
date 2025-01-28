using BLL.DTOs.Boat;

namespace BLL.Services.Interfaces
{
    public interface IBoatService
    {
        Task<IList<BoatDTO>> GetBoats(Guid fishFarmId);
        Task<BoatDTO> AddBoat(Guid fishFarmId, BoatDTO boatDTO);
        Task<BoatDTO> UpdateBoat(Guid fishFarmId, string boatId, BoatDTO boatDTO);
    }
}
