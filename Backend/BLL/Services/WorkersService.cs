using AutoMapper;
using BLL.DTOs.Workers;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;

namespace BLL.Services
{
    public class WorkersService(IWorkersRepository workersRepository, IFishFarmsRepository fishFarmsRepository, IMapper mapper) : IWorkersService
    {
        private readonly IWorkersRepository _workersRepository = workersRepository;
        private readonly IFishFarmsRepository _fishFarmsRepository = fishFarmsRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IList<WorkerResponseDTO>> GetWorkers(Guid fishFarmId, string userId)
        {
            await CheckPermission(userId, fishFarmId);
            var workers = await _workersRepository.GetWorkerEntities(fishFarmId);
            return _mapper.Map<IList<WorkerResponseDTO>>(workers);
        }

        public async Task<WorkerResponseDTO> GetWorkerById(Guid workerId, string userId)
        {
            WorkerEntity? worker = await _workersRepository.GetWorkerEntityById(workerId);
            if (worker is null)
                throw new KeyNotFoundException($"Worker with id {workerId} not found");
            await CheckPermission(userId, worker.FishFarmId);
            return _mapper.Map<WorkerResponseDTO>(worker);
        }

        public async Task<WorkerResponseDTO> AddWorker(WorkerRequestDTO worker, Guid fishFarmId, string userId)
        {
            await CheckPermission(userId, fishFarmId);
            var workerEntity = _mapper.Map<WorkerEntity>(worker);
            workerEntity.FishFarmId = fishFarmId;
            var addedWorker = await _workersRepository.AddWorkerEntity(workerEntity);
            return _mapper.Map<WorkerResponseDTO>(addedWorker);
        }

        public async Task<WorkerResponseDTO> UpdateWorker(WorkerRequestDTO worker, Guid workerId, string userId)
        {
            await CheckWorkerPermissions(userId, workerId);
            var workerEntity = _mapper.Map<WorkerEntity>(worker);
            workerEntity.Id = workerId;
            var updatedWorker = await _workersRepository.UpdateWorkerEntity(workerEntity);
            return _mapper.Map<WorkerResponseDTO>(updatedWorker);
        }

        public async Task<WorkerResponseDTO> DeleteWorker(Guid workerId, string userId)
        {
            await CheckWorkerPermissions(userId, workerId);
            var deletedWorker = await _workersRepository.DeleteWorkerEntity(workerId);
            if (deletedWorker is null)
                throw new KeyNotFoundException($"Worker with id {workerId} not found");
            return _mapper.Map<WorkerResponseDTO>(deletedWorker);
        }

        private async Task CheckWorkerPermissions(string userId, Guid workerId)
        {
            var worker = await _workersRepository.GetWorkerEntityById(workerId);
            if (worker is null)
            {
                throw new KeyNotFoundException($"Worker with id {workerId} not found");
            }
            await CheckPermission(userId, worker.FishFarmId);
        }

        private async Task CheckPermission(string userId, Guid fishFarmId)
        {
            var fishFarm = await _fishFarmsRepository.GetFishFarmEntityById(fishFarmId, userId);
            if (fishFarm is null)
            {
                throw new UnauthorizedAccessException("You don't have permission to access this resource");
            }
        }
    }
}
