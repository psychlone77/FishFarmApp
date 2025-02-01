using AutoMapper;
using BLL.Services.Interfaces;
using DAL.Entities;
using static BLL.Utils.Helpers;

namespace BLL.DTOs.FishFarm
{
    public class FishFarmProfile : Profile
    {
        public FishFarmProfile()
        {
            // DAL -> BLL
            CreateMap<FishFarmEntity, FishFarmResponseDTO>()
                            .ForMember(dest => dest.HasBarge, opt => opt.MapFrom<HasBargeResolver>());
            CreateMap<FishFarmEntity, FishFarmRequestDTO>();
            CreateMap<FishFarmUser, FishFarmUserDTO>()
                .ForMember(dest => dest.PermissionLevel, opt => opt.MapFrom(src => GetPermissionsString(src.PermissionLevel)));

            // BLL -> DAL
            CreateMap<FishFarmResponseDTO, FishFarmEntity>();
            CreateMap<FishFarmRequestDTO, FishFarmEntity>();
        }
    }

    public class HasBargeResolver(IFishFarmsService fishFarmsService) : IValueResolver<FishFarmEntity, FishFarmResponseDTO, bool>
    {
        private readonly IFishFarmsService _fishFarmsService = fishFarmsService;

        public bool Resolve(FishFarmEntity source, FishFarmResponseDTO destination, bool destMember, ResolutionContext context)
        {
            return _fishFarmsService.HasBarge(source.Id).Result;
        }
    }
}
