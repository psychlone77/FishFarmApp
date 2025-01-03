using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class WorkerEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? ImageURL { get; set; }
        public int Age { get; set; }
        public required string Email { get; set; }
        public WorkerPosition WorkerPosition { get; set; }
        public DateTime CertifiedUntil { get; set; }

        public int FishFarmId { get; set; }
        public required FishFarmEntity FishFarm { get; set; }
    }

    public enum WorkerPosition
    {
        CEO,
        Worker,
        Captain,
    }
}
