using AutoMapper;
using BLL.DTOs.Employee;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;

namespace BLL.Services
{
    public class EmployeeService(IEmployeeRepository employeeRepository, IFishFarmRepository fishFarmsRepository, IMapper mapper) : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository = employeeRepository;
        private readonly IFishFarmRepository _fishFarmsRepository = fishFarmsRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IList<EmployeeResponseDTO>> GetEmployees(Guid fishFarmId, string userId)
        {
            await CheckPermission(userId, fishFarmId);
            var employee = await _employeeRepository.GetEmployeeEntities(fishFarmId);
            return _mapper.Map<IList<EmployeeResponseDTO>>(employee);
        }

        public async Task<EmployeeResponseDTO> GetEmployeeById(string workerId, string userId)
        {
            EmployeeEntity? worker = await _employeeRepository.GetEmployeeEntityById(workerId);
            if (worker is null)
                throw new KeyNotFoundException($"Employee with id {workerId} not found");
            //await CheckPermission(userId, worker.FishFarmId);
            return _mapper.Map<EmployeeResponseDTO>(worker);
        }

        public async Task<EmployeeResponseDTO> AddEmployee(EmployeeRequestDTO worker, Guid fishFarmId, string userId)
        {
            await CheckPermission(userId, fishFarmId);
            var workerEntity = _mapper.Map<EmployeeEntity>(worker);
            //workerEntity.FishFarmId = fishFarmId;
            var addedEmployee = await _employeeRepository.AddEmployeeEntity(workerEntity);
            return _mapper.Map<EmployeeResponseDTO>(addedEmployee);
        }

        public async Task<EmployeeResponseDTO> UpdateEmployee(EmployeeRequestDTO worker, string workerId, string userId)
        {
            await CheckEmployeePermissions(userId, workerId);
            var workerEntity = _mapper.Map<EmployeeEntity>(worker);
            workerEntity.Id = workerId.ToString();
            var updatedEmployee = await _employeeRepository.UpdateEmployeeEntity(workerEntity);
            if (updatedEmployee is null)
                throw new KeyNotFoundException($"Employee with id {workerId} not found");
            return _mapper.Map<EmployeeResponseDTO>(updatedEmployee);
        }

        public async Task<EmployeeResponseDTO> DeleteEmployee(string workerId, string userId)
        {
            await CheckEmployeePermissions(userId, workerId);
            var deletedEmployee = await _employeeRepository.DeleteEmployeeEntity(workerId);
            if (deletedEmployee is null)
                throw new KeyNotFoundException($"Employee with id {workerId} not found");
            return _mapper.Map<EmployeeResponseDTO>(deletedEmployee);
        }

        private async Task CheckEmployeePermissions(string userId, string workerId)
        {
            var worker = await _employeeRepository.GetEmployeeEntityById(workerId);
            if (worker is null)
            {
                throw new KeyNotFoundException($"Employee with id {workerId} not found");
            }
            //await CheckPermission(userId, worker.FishFarmId);
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
