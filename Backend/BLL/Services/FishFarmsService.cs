using AutoMapper;
using BLL.AppConfigManager;
using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using BlobStorage.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.Extensions.Configuration;

namespace BLL.Services
{
    public class FishFarmsService(IFishFarmRepository fishFarmRepository, IBoatRepository boatRepository, IBlobStorage blobStorage, IAuthService authService, IMapper mapper, IAppConfigManager configManager) : IFishFarmsService
    {
        private readonly IFishFarmRepository _fishFarmRepository = fishFarmRepository;
        private readonly IBoatRepository _boatRepository = boatRepository;
        private readonly IBlobStorage _blobStorage = blobStorage;
        private readonly IMapper _mapper = mapper;
        private readonly string _containerName = configManager.GetFishFarmContainerName();
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
            if(fishFarm.Image is null)
                throw new ArgumentException("Image is required");
            var fishFarmId = Guid.NewGuid();
            var imageURL = await _blobStorage.UploadFile(_containerName, fishFarmId.ToString(), fishFarm.Image.OpenReadStream());
            FishFarmEntity fishFarmEntity = _mapper.Map<FishFarmEntity>(fishFarm);
            fishFarmEntity.Id = fishFarmId;
            fishFarmEntity.ImageURL = imageURL;
            FishFarmEntity addedFishFarm = await _fishFarmRepository.AddFishFarmEntity(fishFarmEntity);
            return _mapper.Map<FishFarmResponseDTO>(addedFishFarm);
        }

        public async Task<FishFarmResponseDTO> UpdateFishFarm(FishFarmRequestDTO fishFarm, Guid fishFarmId, string userId, string userRole)
        {
            if (userRole != "SuperAdmin")
                await _authService.CheckFishFarmAccess(fishFarmId, userId, PermissionLevel.Write);
            FishFarmEntity fishFarmEntity = _mapper.Map<FishFarmEntity>(fishFarm);
            fishFarmEntity.Id = fishFarmId;
            var currentFishFarm = await _fishFarmRepository.GetFishFarmEntityById(fishFarmId);
            if (fishFarm.Image is not null)
            {
                await _blobStorage.DeleteFile(_containerName, fishFarmId.ToString());
                var imageURL = await _blobStorage.UploadFile(_containerName, fishFarmId.ToString(), fishFarm.Image.OpenReadStream());
                fishFarmEntity.ImageURL = imageURL;
            }
            else
            {
                fishFarmEntity.ImageURL = currentFishFarm!.ImageURL;
            }
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

        public async Task<bool> HasBarge(Guid fishFarmId)
        {
            var boats =  await _boatRepository.GetBoats(fishFarmId);
            return boats.Any(boat => boat.BoatType == BoatType.Barge);
        }
    }
}
