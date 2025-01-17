using AutoMapper;
using DAL.Entities;

namespace BLL.DTOs.Workers
{
    public class WorkerProfile : Profile
    {
        public WorkerProfile()
        {
            // DAL -> BLL
            CreateMap<EmployeeEntity, WorkerResponseDTO>()
                .ForMember(dest => dest.WorkerPosition, opt => opt.MapFrom(src => src.WorkerPosition.ToString()));

            CreateMap<EmployeeEntity, WorkerRequestDTO>()
                .ForMember(dest => dest.WorkerPosition, opt => opt.MapFrom(src => src.WorkerPosition.ToString()));

            // BLL -> DAL
            CreateMap<WorkerResponseDTO, EmployeeEntity>()
                .ForMember(dest => dest.WorkerPosition, opt => opt.MapFrom(src => Enum.Parse<WorkerPosition>(src.WorkerPosition)));

            CreateMap<WorkerRequestDTO, EmployeeEntity>()
                .ForMember(dest => dest.WorkerPosition, opt => opt.MapFrom(src => Enum.Parse<WorkerPosition>(src.WorkerPosition)));
        }
    }
}
