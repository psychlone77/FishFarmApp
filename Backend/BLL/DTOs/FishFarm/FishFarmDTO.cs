using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.FishFarm
{
    public class FishFarmResponseDTO
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int CageCount { get; set; }
        public Boolean HasBarge { get; set; }
        public required Uri ImageURL { get; set; }
        public DateTime CreatedOn { get; set; }
        public int PermissionLevel { get; set; }
    }

    public class FishFarmRequestDTO
    {
        public required string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int CageCount { get; set; }
        public Boolean HasBarge { get; set; }
        public IFormFile? Image { get; set; }
    }

    public class FishFarmUserDTO
    {
        public Guid FishFarmId { get; set; }
        public Guid UserId { get; set; }
        public string PermissionLevel { get; set; } = "Error";
        public DateTime AssignedDate { get; set; }
        public FishFarmResponseDTO? FishFarm { get; set; }
    }
}
