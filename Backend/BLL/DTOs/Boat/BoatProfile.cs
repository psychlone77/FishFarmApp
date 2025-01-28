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
                .ForMember(dest => dest.BoatType, opt => opt.MapFrom(src => src.BoatType.ToString()));

            // BLL -> DAL
            CreateMap<BoatDTO, BoatEntity>()
                .ForMember(dest => dest.BoatType, opt => opt.MapFrom(src => Enum.Parse<BoatType>(src.BoatType)));
        }
    }
}
