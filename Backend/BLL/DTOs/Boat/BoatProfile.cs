using System.ComponentModel.DataAnnotations;
using System.Reflection;
using AutoMapper;
using DAL.Entities;

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

        private string GetEnumDisplayName(Enum enumValue)
        {
            return enumValue.GetType()
                            .GetMember(enumValue.ToString())
                            .First()
                            .GetCustomAttribute<DisplayAttribute>()?
                            .GetName() ?? enumValue.ToString();
        }

        private TEnum? GetEnumValueFromDisplayName<TEnum>(string displayName) where TEnum : struct, Enum
        {
            return Enum.GetValues(typeof(TEnum))
                       .Cast<TEnum>()
                       .FirstOrDefault(e => GetEnumDisplayName(e) == displayName);
        }
    }
}
