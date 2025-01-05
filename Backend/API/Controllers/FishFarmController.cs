using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FishFarmController(IFishFarmsService fishFarmsService) : Controller
    {
        private readonly IFishFarmsService _fishFarmsService = fishFarmsService;

        [HttpGet]
        public async Task<ActionResult<List<FishFarmResponseDTO>>> GetAllFishFarms()
        {
            return Ok(await _fishFarmsService.GetAllFishFarms());
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<FishFarmResponseDTO>> GetFishFarmById(Guid id)
        {
            return Ok(await _fishFarmsService.GetFishFarmById(id));
        }
        [HttpPost]
        public async Task<ActionResult<FishFarmResponseDTO>> AddFishFarm(FishFarmRequestDTO fishFarm)
        {
            return Ok(await _fishFarmsService.AddFishFarm(fishFarm));
        }

        [HttpPut]
        [Route("{fishFarmId}")]
        public async Task<ActionResult<FishFarmResponseDTO>> UpdateFishFarm(FishFarmRequestDTO fishFarm, Guid fishFarmId)
        {
            return Ok(await _fishFarmsService.UpdateFishFarm(fishFarm, fishFarmId));
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<FishFarmResponseDTO>> DeleteFishFarm(Guid id)
        {
            return Ok(await _fishFarmsService.DeleteFishFarm(id));
        }
    }
}