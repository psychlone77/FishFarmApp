namespace DAL.Entities
{
    public class FishFarmEntity : BaseEntity
    {
        public required string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int CageCount { get; set; }
        public Boolean HasBarge { get; set; }
        public required Uri ImageURL { get; set; }

        public ICollection<WorkerEntity>? Workers { get; set; }
    }
}
