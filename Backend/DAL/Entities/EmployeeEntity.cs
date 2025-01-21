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

        public UserEntity? User { get; set; }
    }

    public enum EmployeePosition
    {
        [Display(Name = "CEO")]
        CEO,
        [Display(Name = "Captain")]
        Captain,
        [Display(Name = "Worker")]
        Worker,
    }
}
