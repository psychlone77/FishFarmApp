using AutoMapper;
using BLL.DTOs.Boat;
using BLL.Services.Interfaces;
using BLL.Utils;
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

        public async Task<IList<BoatWithFishFarmDTO>> GetAllBoats()
        {
            return _mapper.Map<IList<BoatWithFishFarmDTO>>(await _boatRepository.GetAllBoats());
        }

        public async Task<IList<BoatWithFishFarmDTO>> GetAllBoats(Guid userId)
        {
            return _mapper.Map<IList<BoatWithFishFarmDTO>>(await _boatRepository.GetAllBoats(userId));
        }

        public IList<string> GetBoatTypes()
        {
            return Enum.GetValues(typeof(BoatType))
                       .Cast<BoatType>()
                       .Select(position => Helpers.GetEnumDisplayName(position))
                       .ToList();
        }

        public async Task<BoatDTO> AddBoat(Guid fishFarmId, BoatDTO boatDTO)
        {
            var existingBoat = await _boatRepository.GetBoat(boatDTO.Id);
            if (existingBoat != null)
                throw new ArgumentException("Boat with ID already exists");
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

        public async Task<BoatDTO> DeleteBoat(Guid fishFarmId, string boatId)
        {
            var boat = await _boatRepository.GetBoat(boatId);
            if (boat == null)
                throw new KeyNotFoundException("Boat not found");
            if (boat.FishFarmId != fishFarmId)
                throw new UnauthorizedAccessException("Boat does not belong to the fish farm");
            return _mapper.Map<BoatDTO>(await _boatRepository.DeleteBoat(boatId));
        }

        public async Task<BoatDTO> ReassignBoat(Guid fishFarmId, string boatId, Guid newFishFarmId)
        {
            var boat = await _boatRepository.GetBoat(boatId);
            if (boat == null)
                throw new KeyNotFoundException("Boat not found");
            if (boat.FishFarmId != fishFarmId)
                throw new UnauthorizedAccessException("Current Fish Farm Id does not match old one");
            boat.FishFarmId = newFishFarmId;
            return _mapper.Map<BoatDTO>(await _boatRepository.UpdateBoat(boat));
        }
    }
}
