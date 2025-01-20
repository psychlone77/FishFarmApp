using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class EmployeeEntity : BaseEntity
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public string? ImageURL { get; set; }
        public int Age { get; set; }
        public EmployeePosition EmployeePosition { get; set; }
        public DateTime CertifiedUntil { get; set; }

        public ICollection<FishFarmEntity>? FishFarms { get; set; }
        public ICollection<FishFarmEmployee>? FishFarmEmployees { get; set; }

        public Guid? UserId { get; set; }
        public required UserEntity? User { get; set; }
    }

    public enum EmployeePosition
    {
        [Display(Name = "CEO")]
        CEO,
        [Display(Name = "Worker")]
        Worker,
        [Display(Name = "Captain")]
        Captain,
    }
}
