using System.Security.Claims;
using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class FishFarmsController : Controller
    {
        private readonly IFishFarmsService _fishFarmsService;

        public FishFarmsController(IFishFarmsService fishFarmsService)
        {
            _fishFarmsService = fishFarmsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<FishFarmResponseDTO>>> GetAllFishFarms()
        {
            var userId = GetUserId();
            return Ok(await _fishFarmsService.GetAllFishFarms(userId));
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<FishFarmResponseDTO>> GetFishFarmById(Guid fishFarmId)
        {
            var userId = GetUserId();
            return Ok(await _fishFarmsService.GetFishFarmById(fishFarmId, userId));
        }

        [HttpPost]
        public async Task<ActionResult<FishFarmResponseDTO>> AddFishFarm(FishFarmRequestDTO fishFarm)
        {
            var userId = GetUserId();
            return Ok(await _fishFarmsService.AddFishFarm(fishFarm, userId));
        }

        [HttpPut]
        [Route("{fishFarmId}")]
        public async Task<ActionResult<FishFarmResponseDTO>> UpdateFishFarm(FishFarmRequestDTO fishFarm, Guid fishFarmId)
        {
            var userId = GetUserId();
            return Ok(await _fishFarmsService.UpdateFishFarm(fishFarm, fishFarmId, userId));
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<FishFarmResponseDTO>> DeleteFishFarm(Guid fishFarmId)
        {
            var userId = GetUserId();
            return Ok(await _fishFarmsService.DeleteFishFarm(fishFarmId, userId));
        }

        private string GetUserId()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                throw new ArgumentNullException("User ID claim not found.");
            }
            return userIdClaim;
        }
    }
}
