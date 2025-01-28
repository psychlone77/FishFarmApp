using System.Text.Json.Serialization;

namespace DAL.Entities
{
    public class FishFarmUser
    {
        public int PermissionLevel { get; set; }
        public DateTime AssignedDate { get; set; }

        public Guid FishFarmId { get; set; }
        public required FishFarmEntity FishFarm { get; set; }
        public required Guid UserId { get; set; }
        public required UserEntity User { get; set; }
    }

    // Bitmask enum
    // Bitmasking allows combining multiple enum values using bitwise operations.
    // Each value is a power of 2, so they can be combined uniquely.
    // For example, Read | Write = 1 | 2 = 3, which represents both Read and Write permissions.
    public enum PermissionLevel
    {
        Read = 1,
        Write = 2,
        Delete = 4
    }
}
