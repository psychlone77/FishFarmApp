using AutoMapper;
using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;

namespace BLL.Services
{
    public class FishFarmsService(IFishFarmRepository fishFarmsRepository, IMapper mapper) : IFishFarmsService
    {
        public readonly IFishFarmRepository _fishFarmsRepository = fishFarmsRepository;
        private readonly IMapper _mapper = mapper;
        public async Task<IList<FishFarmResponseDTO>> GetAllFishFarms(string userId, string userRole)
        {
            if(userRole == "SuperAdmin")
            {
                IList<FishFarmEntity> fishFarms = await _fishFarmsRepository.GetAllFishFarmEntites();
                return _mapper.Map<IList<FishFarmResponseDTO>>(fishFarms);
            }
            else
            {
                IList<FishFarmEntity> fishFarms = await _fishFarmsRepository.GetAllFishFarmEntites(userId);
                return _mapper.Map<IList<FishFarmResponseDTO>>(fishFarms);
            }
        }

        public async Task<FishFarmResponseDTO> GetFishFarmById(Guid fishFarmId, string userId, string userRole)
        {
            FishFarmEntity? fishFarm;
            if (userRole == "SuperAdmin")
            {
                fishFarm = await _fishFarmsRepository.GetFishFarmEntityById(fishFarmId);
            }
            else
            {
                fishFarm = await _fishFarmsRepository.GetFishFarmEntityById(fishFarmId, userId);
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
            FishFarmEntity addedFishFarm = await _fishFarmsRepository.AddFishFarmEntity(fishFarmEntity);
            return _mapper.Map<FishFarmResponseDTO>(addedFishFarm);
        }

        public async Task<FishFarmResponseDTO> UpdateFishFarm(FishFarmRequestDTO fishFarm, Guid fishFarmId, string userId, string userRole)
        {
            if (userRole != "SuperAdmin")
                await CheckFishFarmAccess(fishFarmId, userId, PermissionLevel.Write);
            FishFarmEntity fishFarmEntity = _mapper.Map<FishFarmEntity>(fishFarm);
            fishFarmEntity.Id = fishFarmId;
            FishFarmEntity? updatedFishFarm = await _fishFarmsRepository.UpdateFishFarmEntity(fishFarmEntity, userId);
            if (updatedFishFarm is null)
                throw new KeyNotFoundException($"Fish farm with id {fishFarmId} not found");
            return _mapper.Map<FishFarmResponseDTO>(updatedFishFarm);
        }

        public async Task<FishFarmResponseDTO> DeleteFishFarm(Guid fishFarmId, string userId, string userRole)
        {
            if (userRole != "SuperAdmin")
                await CheckFishFarmAccess(fishFarmId, userId, PermissionLevel.Delete);
            FishFarmEntity? deletedFishFarm = await _fishFarmsRepository.DeleteFishFarmEntity(fishFarmId, userId);
            if (deletedFishFarm is null)
                throw new KeyNotFoundException($"Fish farm with id {fishFarmId} not found");
            return _mapper.Map<FishFarmResponseDTO>(deletedFishFarm);
        }

        private async Task CheckFishFarmAccess(Guid fishFarmId, string userId, PermissionLevel permissionLevel)
        {
            FishFarmEntity? fishFarm = await _fishFarmsRepository.GetFishFarmByPermissionLevel(fishFarmId, userId, permissionLevel);
            if (fishFarm is null)
                throw new AccessViolationException($"You do not have access to this Fish Farm");
            return ;
        }
    }
}
