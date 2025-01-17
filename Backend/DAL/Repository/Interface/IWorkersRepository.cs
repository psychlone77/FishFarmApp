using DAL.Entities;

namespace DAL.Repository.Interface
{
    public interface IWorkersRepository
    {
        Task<IList<EmployeeEntity>> GetWorkerEntities(Guid fishFarmId);
        Task<EmployeeEntity?> GetWorkerEntityById(Guid workerId);
        Task<EmployeeEntity> AddWorkerEntity(EmployeeEntity workerEntity);
        Task<EmployeeEntity?> UpdateWorkerEntity(EmployeeEntity workerEntity);
        Task<EmployeeEntity?> DeleteWorkerEntity(Guid workerId);
    }
}
