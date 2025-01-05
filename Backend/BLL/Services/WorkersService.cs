using AutoMapper;
using BLL.DTOs.Workers;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;

namespace BLL.Services
{
    public class WorkersService(IWorkersRepository workersRepository, IMapper mapper) : IWorkersService
    {
        private readonly IWorkersRepository _workersRepository = workersRepository;
        private readonly IMapper _mapper = mapper;
        public async Task<IList<WorkerResponseDTO>> GetWorkers(Guid fishFarmId)
        {
            var workers = await _workersRepository.GetWorkerEntities(fishFarmId);
            return _mapper.Map<IList<WorkerResponseDTO>>(workers);
        }

        public async Task<WorkerResponseDTO> GetWorkerById(Guid workerId)
        {
            var worker = await _workersRepository.GetWorkerEntityById(workerId);
            if (worker is null)
                throw new KeyNotFoundException($"Worker with id {workerId} not found");
            return _mapper.Map<WorkerResponseDTO>(worker);
        }

        public async Task<WorkerResponseDTO> AddWorker(WorkerRequestDTO worker, Guid fishFarmId)
        {
            var workerEntity = _mapper.Map<WorkerEntity>(worker);
            workerEntity.FishFarmId = fishFarmId;
            var addedWorker = await _workersRepository.AddWorkerEntity(workerEntity);
            return _mapper.Map<WorkerResponseDTO>(addedWorker);
        }

        public async Task<WorkerResponseDTO> UpdateWorker(WorkerRequestDTO worker, Guid workerId)
        {
            var workerEntity = _mapper.Map<WorkerEntity>(worker);
            workerEntity.Id = workerId;
            var updatedWorker = await _workersRepository.UpdateWorkerEntity(workerEntity);
            return _mapper.Map<WorkerResponseDTO>(updatedWorker);
        }

        public async Task<WorkerResponseDTO> DeleteWorker(Guid workerId)
        {
            var deletedWorker = await _workersRepository.DeleteWorkerEntity(workerId);
            if (deletedWorker is null)
                throw new KeyNotFoundException($"Worker with id {workerId} not found");
            return _mapper.Map<WorkerResponseDTO>(deletedWorker);
        }
    }
}
