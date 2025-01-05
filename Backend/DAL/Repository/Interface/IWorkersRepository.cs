using DAL.Entities;

namespace DAL.Repository.Interface
{
    public interface IWorkersRepository
    {
        Task<IList<WorkerEntity>> GetWorkerEntities(Guid fishFarmId);
        Task<WorkerEntity?> GetWorkerEntityById(Guid workerId);
        Task<WorkerEntity> AddWorkerEntity(WorkerEntity workerEntity);
        Task<WorkerEntity?> UpdateWorkerEntity(WorkerEntity workerEntity);
        Task<WorkerEntity?> DeleteWorkerEntity(Guid workerId);
    }
}
