using DAL.Entities;

namespace DAL.Repository.Interface
{
    public interface IBoatRepository
    {
        Task<IList<BoatEntity>> GetBoats(Guid fishFarmId);
        Task<BoatEntity?> GetBoat(string boatId);
        Task<BoatEntity> AddBoat(BoatEntity boatEntity);
        Task<BoatEntity> UpdateBoat(BoatEntity boatEntity);
        Task<BoatEntity> DeleteBoat(string boatId);
    }
}
