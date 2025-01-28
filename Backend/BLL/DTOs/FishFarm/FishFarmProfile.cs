using AutoMapper;
using DAL.Entities;

namespace BLL.DTOs.FishFarm
{
    public class FishFarmProfile : Profile
    {
        public FishFarmProfile()
        {
            // DAL -> BLL
            CreateMap<FishFarmEntity, FishFarmResponseDTO>();
            CreateMap<FishFarmEntity, FishFarmRequestDTO>();
            CreateMap<FishFarmUser, FishFarmUserDTO>();

            // BLL -> DAL
            CreateMap<FishFarmResponseDTO, FishFarmEntity>();
            CreateMap<FishFarmRequestDTO, FishFarmEntity>();
            CreateMap<FishFarmUserDTO, FishFarmUser>();
        }
    }
}
