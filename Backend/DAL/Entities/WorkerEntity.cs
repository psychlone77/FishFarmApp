using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class WorkerEntity : BaseEntity
    {
        public required string Name { get; set; }
        public string? ImageURL { get; set; }
        public int Age { get; set; }
        public required string Email { get; set; }
        public WorkerPosition WorkerPosition { get; set; }
        public DateTime CertifiedUntil { get; set; }

        public Guid FishFarmId { get; set; }
        public required FishFarmEntity FishFarm { get; set; }
    }

    public enum WorkerPosition
    {
        [Display(Name = "CEO")]
        CEO,
        [Display(Name = "Worker")]
        Worker,
        [Display(Name = "Captain")]
        Captain,
    }
}
