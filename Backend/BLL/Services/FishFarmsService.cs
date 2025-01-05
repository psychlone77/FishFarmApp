using AutoMapper;
using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;

namespace BLL.Services
{
    public class FishFarmsService(IFishFarmsRepository fishFarmsRepository, IMapper mapper) : IFishFarmsService
    {
        private readonly IFishFarmsRepository _fishFarmsRepository = fishFarmsRepository;
        private readonly IMapper _mapper = mapper;
        public async Task<IList<FishFarmResponseDTO>> GetAllFishFarms()
        {
            IList<FishFarmEntity> fishFarms = await _fishFarmsRepository.GetAllFishFarmEntites();
            return _mapper.Map<IList<FishFarmResponseDTO>>(fishFarms);
        }

        public async Task<FishFarmResponseDTO> GetFishFarmById(Guid id)
        {
            FishFarmEntity? fishFarm = await _fishFarmsRepository.GetFishFarmEntityById(id);
            if(fishFarm is null)
                throw new KeyNotFoundException($"Fish farm with id {id} not found");
            return _mapper.Map<FishFarmResponseDTO>(fishFarm);
        }

        public async Task<FishFarmResponseDTO> AddFishFarm(FishFarmRequestDTO fishFarm)
        {
            FishFarmEntity fishFarmEntity = _mapper.Map<FishFarmEntity>(fishFarm);
            FishFarmEntity addedFishFarm = await _fishFarmsRepository.AddFishFarmEntity(fishFarmEntity);
            return _mapper.Map<FishFarmResponseDTO>(addedFishFarm);
        }

        public async Task<FishFarmResponseDTO> UpdateFishFarm(FishFarmRequestDTO fishFarm, Guid id)
        {
            FishFarmEntity fishFarmEntity = _mapper.Map<FishFarmEntity>(fishFarm);
            fishFarmEntity.Id = id;
            FishFarmEntity updatedFishFarm = await _fishFarmsRepository.UpdateFishFarmEntity(fishFarmEntity);
            return _mapper.Map<FishFarmResponseDTO>(updatedFishFarm);
        }

        public async Task<FishFarmResponseDTO> DeleteFishFarm(Guid id)
        {
            FishFarmEntity? deletedFishFarm = await _fishFarmsRepository.DeleteFishFarmEntity(id);
            if (deletedFishFarm is null)
                throw new KeyNotFoundException($"Fish farm with id {id} not found");
            return _mapper.Map<FishFarmResponseDTO>(deletedFishFarm);
        }
    }
}
