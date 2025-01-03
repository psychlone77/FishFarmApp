using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.Services.Interfaces;
using DAL.Entities;
using DAL.Repository.Interface;

namespace BLL.Services
{
    public class FishFarmsService(IFishFarmsRepository fishFarmsRepository) : IFishFarmsService
    {
        private readonly IFishFarmsRepository _fishFarmsRepository = fishFarmsRepository;
        public async Task<ICollection<FishFarmEntity>> GetAllFishFarms()
        {
            return await _fishFarmsRepository.GetAllFishFarms();
        }
    }
}
