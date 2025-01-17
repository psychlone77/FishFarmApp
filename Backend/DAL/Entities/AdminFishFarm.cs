namespace DAL.Entities
{
    public class AdminFishFarm
    {
        public int PermissionLevel { get; set; }

        public Guid AdminId { get; set; }
        public required AdminEntity Admin { get; set; }

        public Guid FishFarmId { get; set; }
        public required FishFarmEntity FishFarm { get; set; }
    }
}
