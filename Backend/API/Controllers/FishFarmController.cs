using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static API.Utils.Auth;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FishFarmsController(IFishFarmsService fishFarmsService) : Controller
    {
        private readonly IFishFarmsService _fishFarmsService = fishFarmsService;

        [HttpGet]
        public async Task<ActionResult<List<FishFarmResponseDTO>>> GetAllFishFarms()
        {
            var (userId, userRole) = GetClaims(User);
            return Ok(await _fishFarmsService.GetAllFishFarms(userId, userRole));
        }

        [HttpGet]
        [Route("{fishFarmId}")]
        public async Task<ActionResult<FishFarmResponseDTO>> GetFishFarmById(Guid fishFarmId)
        {
            var (userId, userRole) = GetClaims(User);
            return Ok(await _fishFarmsService.GetFishFarmById(fishFarmId, userId, userRole));
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ActionResult<FishFarmResponseDTO>> AddFishFarm([FromForm] FishFarmRequestDTO fishFarm)
        {
            return Ok(await _fishFarmsService.AddFishFarm(fishFarm));
        }

        [HttpPut]
        [Route("{fishFarmId}")]
        public async Task<ActionResult<FishFarmResponseDTO>> UpdateFishFarm([FromForm] FishFarmRequestDTO fishFarm, Guid fishFarmId)
        {
            var (userId, userRole) = GetClaims(User);
            return Ok(await _fishFarmsService.UpdateFishFarm(fishFarm, fishFarmId, userId, userRole));
        }

        [HttpDelete]
        [Route("{fishFarmId}")]
        public async Task<ActionResult<FishFarmResponseDTO>> DeleteFishFarm(Guid fishFarmId)
        {
            var (userId, userRole) = GetClaims(User);
            return Ok(await _fishFarmsService.DeleteFishFarm(fishFarmId, userId, userRole));
        }
    }
}
