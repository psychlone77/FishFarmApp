using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace DAL.Entities
{
    public class AdminEntity : BaseEntity
    {
        public required string Name { get; set; }
        public required AdminRole AdminRole { get; set; }

        [Key]
        public Guid UserId { get; set; }
        public required UserEntity User { get; set; }

        public ICollection<FishFarmEntity>? FishFarms { get; set; }
        public ICollection<AdminFishFarm>? AdminFishFarms { get; set; }

    }

    public enum AdminRole
    {
        SuperAdmin,
        Admin
    }
}
