using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    public class EmployeeEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = null!;
        public required string Name { get; set; }
        public Uri? ImageURL { get; set; }
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
