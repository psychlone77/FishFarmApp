using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    public class FishFarmEntity : BaseEntity
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int CageCount { get; set; }
        public required Uri ImageURL { get; set; }

        // Navigation properties for Employees
        public ICollection<UserEntity>? Users { get; set; }
        public ICollection<FishFarmUser>? FishFarmUsers { get; set; }

        // Navigation properties for Boats
        public ICollection<BoatEntity>? Boats { get; set; }
    }
}
