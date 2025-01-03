using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class FishFarmEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int CageCount { get; set; }
        public Boolean HasBarge { get; set; }
        public required Uri ImageURL { get; set; }

        public ICollection<WorkerEntity>? Workers { get; set; }
    }
}
