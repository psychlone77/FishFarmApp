using DAL.Entities;

namespace BLL.DTOs.Workers
{
    public class WorkerResponseDTO
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public string? ImageURL { get; set; }
        public int Age { get; set; }
        public required string Email { get; set; }
        public required string WorkerPosition { get; set; }
        public DateTime CertifiedUntil { get; set; }
    }

    public class WorkerRequestDTO
    {
        public required string Name { get; set; }
        public string? ImageURL { get; set; }
        public int Age { get; set; }
        public required string Email { get; set; }
        public required string WorkerPosition { get; set; }
        public DateTime CertifiedUntil { get; set; }
    }
}
