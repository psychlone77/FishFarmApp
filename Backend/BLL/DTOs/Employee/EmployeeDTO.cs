using Microsoft.AspNetCore.Http;

namespace BLL.DTOs.Employee
{
    public class BaseEmployeeDTO
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public int Age { get; set; }
        public required string EmployeePosition { get; set; }
        public DateTime CertifiedUntil { get; set; }
    }

    public class EmployeeRequestDTO : BaseEmployeeDTO
    {
        public IFormFile? Image { get; set; }
    }

    public class EmployeeResponseDTO : BaseEmployeeDTO
    {
        public required string Id { get; set; }
        public Uri? ImageURL { get; set; }
    }

    public class EmployeeRegisterDTO : BaseEmployeeDTO
    {
        public IFormFile? Image { get; set; }
        public required string Password { get; set; }
    }
}
