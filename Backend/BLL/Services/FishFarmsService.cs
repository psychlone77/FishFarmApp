using AutoMapper;
using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;

namespace BLL.Services
{
    public class FishFarmsService(IFishFarmRepository fishFarmRepository, IAuthService authService, IMapper mapper) : IFishFarmsService
    {
        private readonly IFishFarmRepository _fishFarmRepository = fishFarmRepository;
        private readonly IMapper _mapper = mapper;
        private readonly IAuthService _authService = authService;
        public async Task<IList<FishFarmResponseDTO>> GetAllFishFarms(string userId, string userRole)
        {
            if(userRole == "SuperAdmin")
            {
                IList<FishFarmEntity> fishFarms = await _fishFarmRepository.GetAllFishFarmEntites();
                return _mapper.Map<IList<FishFarmResponseDTO>>(fishFarms);
            }
            else
            {
                IList<FishFarmEntity> fishFarms = await _fishFarmRepository.GetAllFishFarmEntites(userId);
                return _mapper.Map<IList<FishFarmResponseDTO>>(fishFarms);
            }
        }

        public async Task<FishFarmResponseDTO> GetFishFarmById(Guid fishFarmId, string userId, string userRole)
        {
            FishFarmEntity? fishFarm;
            if (userRole == "SuperAdmin")
            {
                fishFarm = await _fishFarmRepository.GetFishFarmEntityById(fishFarmId);
            }
            else
            {
                fishFarm = await _fishFarmRepository.GetFishFarmEntityById(fishFarmId, userId);
                if (fishFarm is null)
                    throw new AccessViolationException($"You do not have read access to this Fish Farm");
            }
            if (fishFarm is null)
                throw new KeyNotFoundException($"Fish farm with id {fishFarmId} not found");
            return _mapper.Map<FishFarmResponseDTO>(fishFarm);
        }

        public async Task<FishFarmResponseDTO> AddFishFarm(FishFarmRequestDTO fishFarm)
        {
            FishFarmEntity fishFarmEntity = _mapper.Map<FishFarmEntity>(fishFarm);
            FishFarmEntity addedFishFarm = await _fishFarmRepository.AddFishFarmEntity(fishFarmEntity);
            return _mapper.Map<FishFarmResponseDTO>(addedFishFarm);
        }

        public async Task<FishFarmResponseDTO> UpdateFishFarm(FishFarmRequestDTO fishFarm, Guid fishFarmId, string userId, string userRole)
        {
            if (userRole != "SuperAdmin")
                await _authService.CheckFishFarmAccess(fishFarmId, userId, PermissionLevel.Write);
            FishFarmEntity fishFarmEntity = _mapper.Map<FishFarmEntity>(fishFarm);
            fishFarmEntity.Id = fishFarmId;
            FishFarmEntity? updatedFishFarm = await _fishFarmRepository.UpdateFishFarmEntity(fishFarmEntity, userId);
            if (updatedFishFarm is null)
                throw new KeyNotFoundException($"Fish farm with id {fishFarmId} not found");
            return _mapper.Map<FishFarmResponseDTO>(updatedFishFarm);
        }

        public async Task<FishFarmResponseDTO> DeleteFishFarm(Guid fishFarmId, string userId, string userRole)
        {
            if (userRole != "SuperAdmin")
                await _authService.CheckFishFarmAccess(fishFarmId, userId, PermissionLevel.Delete);
            FishFarmEntity? deletedFishFarm = await _fishFarmRepository.DeleteFishFarmEntity(fishFarmId, userId);
            if (deletedFishFarm is null)
                throw new KeyNotFoundException($"Fish farm with id {fishFarmId} not found");
            return _mapper.Map<FishFarmResponseDTO>(deletedFishFarm);
        }
    }
}
