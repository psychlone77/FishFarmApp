using AutoMapper;
using DAL.Entities;

namespace BLL.DTOs.Employee
{
    public class EmployeeProfile : Profile
    {
        public EmployeeProfile()
        {
            // DAL -> BLL
            CreateMap<EmployeeEntity, EmployeeResponseDTO>()
                .ForMember(dest => dest.EmployeePosition, opt => opt.MapFrom(src => src.EmployeePosition.ToString()))
                 .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User!.Email));

            CreateMap<EmployeeEntity, EmployeeRequestDTO>()
                    .ForMember(dest => dest.EmployeePosition, opt => opt.MapFrom(src => src.EmployeePosition.ToString()));

            // BLL -> DAL
            CreateMap<EmployeeResponseDTO, EmployeeEntity>()
                .ForMember(dest => dest.EmployeePosition, opt => opt.MapFrom(src => Enum.Parse<EmployeePosition>(src.EmployeePosition)));

            CreateMap<EmployeeRequestDTO, EmployeeEntity>()
                .ForMember(dest => dest.EmployeePosition, opt => opt.MapFrom(src => Enum.Parse<EmployeePosition>(src.EmployeePosition)));

            CreateMap<EmployeeRegisterDTO, EmployeeEntity>()
                .ForMember(dest => dest.EmployeePosition, opt => opt.MapFrom(src => Enum.Parse<EmployeePosition>(src.EmployeePosition)));
        }
    }
}
