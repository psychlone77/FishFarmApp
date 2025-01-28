using AutoMapper;
using BLL.DTOs.Boat;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;

namespace BLL.Services
{
    public class BoatService(IBoatRepository boatRepository, IMapper mapper) : IBoatService
    {
        private readonly IBoatRepository _boatRepository = boatRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IList<BoatDTO>> GetBoats(Guid fishFarmId)
        {
            return _mapper.Map<IList<BoatDTO>>(await _boatRepository.GetBoats(fishFarmId));
        }

        public async Task<BoatDTO> AddBoat(Guid fishFarmId, BoatDTO boatDTO)
        {
            var existingBoat = await _boatRepository.GetBoat(boatDTO.Id);
            if (existingBoat != null)
                throw new KeyNotFoundException("Boat with ID already exists");
            var boatEntity = _mapper.Map<BoatEntity>(boatDTO);
            boatEntity.FishFarmId = fishFarmId;
            return _mapper.Map<BoatDTO>(await _boatRepository.AddBoat(boatEntity));
        }

        public async Task<BoatDTO> UpdateBoat(Guid fishFarmId, string boatId, BoatDTO boatDTO)
        {
            var boatEntity = _mapper.Map<BoatEntity>(boatDTO);
            boatEntity.FishFarmId = fishFarmId;
            boatEntity.Id = boatId;
            return _mapper.Map<BoatDTO>(await _boatRepository.UpdateBoat(boatEntity));
        }
    }
}
