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
        public async Task<IList<FishFarmResponseDTO>> GetAllFishFarms(string userId)
        {
            IList<FishFarmEntity> fishFarms = await _fishFarmsRepository.GetAllFishFarmEntites(userId);
            return _mapper.Map<IList<FishFarmResponseDTO>>(fishFarms);
        }

        public async Task<FishFarmResponseDTO> GetFishFarmById(Guid fishFarmId, string userId)
        {
            FishFarmEntity? fishFarm = await _fishFarmsRepository.GetFishFarmEntityById(fishFarmId, userId);
            if (fishFarm is null)
                throw new KeyNotFoundException($"Fish farm with id {fishFarmId} not found");
            return _mapper.Map<FishFarmResponseDTO>(fishFarm);
        }

        public async Task<FishFarmResponseDTO> AddFishFarm(FishFarmRequestDTO fishFarm, string userId)
        {
            FishFarmEntity fishFarmEntity = _mapper.Map<FishFarmEntity>(fishFarm);
            FishFarmEntity addedFishFarm = await _fishFarmsRepository.AddFishFarmEntity(fishFarmEntity, userId);
            return _mapper.Map<FishFarmResponseDTO>(addedFishFarm);
        }

        public async Task<FishFarmResponseDTO> UpdateFishFarm(FishFarmRequestDTO fishFarm, Guid fishFarmId, string userId)
        {
            FishFarmEntity fishFarmEntity = _mapper.Map<FishFarmEntity>(fishFarm);
            fishFarmEntity.Id = fishFarmId;
            FishFarmEntity? updatedFishFarm = await _fishFarmsRepository.UpdateFishFarmEntity(fishFarmEntity, userId);
            if (updatedFishFarm is null)
                throw new KeyNotFoundException($"Fish farm with id {fishFarmId} not found");
            return _mapper.Map<FishFarmResponseDTO>(updatedFishFarm);
        }

        public async Task<FishFarmResponseDTO> DeleteFishFarm(Guid fishFarmId, string userId)
        {
            FishFarmEntity? deletedFishFarm = await _fishFarmsRepository.DeleteFishFarmEntity(fishFarmId, userId);
            if (deletedFishFarm is null)
                throw new KeyNotFoundException($"Fish farm with id {fishFarmId} not found");
            return _mapper.Map<FishFarmResponseDTO>(deletedFishFarm);
        }
    }
}
