namespace DAL.Entities
{
    public class FishFarmEmployee
    {
        public DateTime AssignedDate { get; set; }

        public Guid FishFarmId { get; set; }
        public required FishFarmEntity FishFarm { get; set; }
        public required string EmployeeId { get; set; }
        public required EmployeeEntity Employee { get; set; }
    }
}
