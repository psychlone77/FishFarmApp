using AutoMapper;
using DAL.Entities;

namespace BLL.DTOs.Workers
{
    public class WorkerProfile : Profile
    {
        public WorkerProfile()
        {
            // DAL -> BLL
            CreateMap<WorkerEntity, WorkerResponseDTO>()
                .ForMember(dest => dest.WorkerPosition, opt => opt.MapFrom(src => src.WorkerPosition.ToString()));

            CreateMap<WorkerEntity, WorkerRequestDTO>()
                .ForMember(dest => dest.WorkerPosition, opt => opt.MapFrom(src => src.WorkerPosition.ToString()));

            // BLL -> DAL
            CreateMap<WorkerResponseDTO, WorkerEntity>()
                .ForMember(dest => dest.WorkerPosition, opt => opt.MapFrom(src => Enum.Parse<WorkerPosition>(src.WorkerPosition)));

            CreateMap<WorkerRequestDTO, WorkerEntity>()
                .ForMember(dest => dest.WorkerPosition, opt => opt.MapFrom(src => Enum.Parse<WorkerPosition>(src.WorkerPosition)));
        }
    }
}
