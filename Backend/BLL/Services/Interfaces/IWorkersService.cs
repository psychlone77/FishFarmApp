using BLL.DTOs.Workers;

namespace BLL.Services.Interfaces
{
    public interface IWorkersService
    {
        Task<IList<WorkerResponseDTO>> GetWorkers(Guid fishFarmId, string userId);
        Task<WorkerResponseDTO> GetWorkerById(Guid worker, string userId);
        Task<WorkerResponseDTO> AddWorker(WorkerRequestDTO worker, Guid fishFarmId, string userId);
        Task<WorkerResponseDTO> UpdateWorker(WorkerRequestDTO worker, Guid workerId, string userId);
        Task<WorkerResponseDTO> DeleteWorker(Guid workerId, string userId);
    }
}
