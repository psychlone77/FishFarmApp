namespace BLL.DTOs.Employee
{
    public class BaseEmployeeDTO
    {
        public required string Name { get; set; }
        public string? ImageURL { get; set; }
        public int Age { get; set; }
        public required string EmployeePosition { get; set; }
        public DateTime CertifiedUntil { get; set; }
    }

    public class EmployeeRequestDTO : BaseEmployeeDTO
    {
    }

    public class EmployeeResponseDTO : BaseEmployeeDTO
    {
        public required string Id { get; set; }
    }

    public class EmployeeRegisterDTO : BaseEmployeeDTO
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class AssignmentRequest
    {
        public required string EmployeeId { get; set; }
        public required Guid FishFarmId { get; set; }
        public required int PermissionLevel { get; set; }
    }
}
