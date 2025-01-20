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
                .ForMember(dest => dest.WorkerPosition, opt => opt.MapFrom(src => src.EmployeePosition.ToString()));

            CreateMap<EmployeeEntity, EmployeeRequestDTO>()
                .ForMember(dest => dest.WorkerPosition, opt => opt.MapFrom(src => src.EmployeePosition.ToString()));

            // BLL -> DAL
            CreateMap<EmployeeResponseDTO, EmployeeEntity>()
                .ForMember(dest => dest.EmployeePosition, opt => opt.MapFrom(src => Enum.Parse<EmployeePosition>(src.WorkerPosition)));

            CreateMap<EmployeeRequestDTO, EmployeeEntity>()
                .ForMember(dest => dest.EmployeePosition, opt => opt.MapFrom(src => Enum.Parse<EmployeePosition>(src.WorkerPosition)));
        }
    }
}
