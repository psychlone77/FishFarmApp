using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class BoatEntity : BaseEntity
    {
        public required string Id { get; set; }
        public required string Model { get; set; }
        public BoatType BoatType { get; set; }

        public Guid? FishFarmId { get; set; }
        public FishFarmEntity? FishFarm { get; set; }
    }

    public enum BoatType
    {
        [Display(Name = "Barge")]
        Barge,
        [Display(Name = "Service Vessel")]
        ServiceVessel,
        [Display(Name = "Work Boat")]
        WorkBoat
    }
}
