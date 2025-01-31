using System.ComponentModel.DataAnnotations;
using System.Reflection;
using AutoMapper;
using DAL.Entities;
using static BLL.Utils.Helpers;

namespace BLL.DTOs.Boat
{
    public class BoatProfile : Profile
    {
        public BoatProfile()
        {
            // DAL -> BLL
            CreateMap<BoatEntity, BoatDTO>()
                .ForMember(dest => dest.BoatType, opt => opt.MapFrom(src => GetEnumDisplayName(src.BoatType)));
            CreateMap<BoatEntity, BoatWithFishFarmDTO>()
                .ForMember(dest => dest.BoatType, opt => opt.MapFrom(src => GetEnumDisplayName(src.BoatType)));

            // BLL -> DAL
            CreateMap<BoatDTO, BoatEntity>()
                .ForMember(dest => dest.BoatType, opt => opt.MapFrom(src => GetEnumValueFromDisplayName<BoatType>(src.BoatType)));
        }
    }
}
