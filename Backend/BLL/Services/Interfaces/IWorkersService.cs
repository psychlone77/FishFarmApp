using BLL.DTOs.Workers;

namespace BLL.Services.Interfaces
{
    public interface IWorkersService
    {
        Task<IList<WorkerResponseDTO>> GetWorkers(Guid fishFarmId);
        Task<WorkerResponseDTO> GetWorkerById(Guid worker);
        Task<WorkerResponseDTO> AddWorker(WorkerRequestDTO worker, Guid fishFarmId);
        Task<WorkerResponseDTO> UpdateWorker(WorkerRequestDTO worker, Guid id);
        Task<WorkerResponseDTO> DeleteWorker(Guid id);
    }
}
