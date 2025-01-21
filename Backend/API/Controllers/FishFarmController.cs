using System.Security.Claims;
using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FishFarmsController(IFishFarmsService fishFarmsService) : Controller
    {
        private readonly IFishFarmsService _fishFarmsService = fishFarmsService;

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<FishFarmResponseDTO>>> GetAllFishFarms()
        {
            var claims = GetClaims();
            return Ok(await _fishFarmsService.GetAllFishFarms(claims.userId, claims.userRole));
        }

        [HttpGet]
        [Route("{fishFarmId}")]
        public async Task<ActionResult<FishFarmResponseDTO>> GetFishFarmById(Guid fishFarmId)
        {
            var claims = GetClaims();
            return Ok(await _fishFarmsService.GetFishFarmById(fishFarmId, claims.userId, claims.userRole));
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ActionResult<FishFarmResponseDTO>> AddFishFarm(FishFarmRequestDTO fishFarm)
        {
            return Ok(await _fishFarmsService.AddFishFarm(fishFarm));
        }

        [HttpPut]
        [Route("{fishFarmId}")]
        public async Task<ActionResult<FishFarmResponseDTO>> UpdateFishFarm(FishFarmRequestDTO fishFarm, Guid fishFarmId)
        {
            var claims = GetClaims();
            return Ok(await _fishFarmsService.UpdateFishFarm(fishFarm, fishFarmId, claims.userId, claims.userRole));
        }

        [HttpDelete]
        [Route("{fishFarmId}")]
        public async Task<ActionResult<FishFarmResponseDTO>> DeleteFishFarm(Guid fishFarmId)
        {
            var claims = GetClaims();
            return Ok(await _fishFarmsService.DeleteFishFarm(fishFarmId, claims.userId, claims.userRole));
        }

        private (string userId, string userRole) GetClaims()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRoleClaim = User.FindFirstValue(ClaimTypes.Role);
            if (userIdClaim == null || userRoleClaim == null)
            {
                throw new ArgumentNullException("User ID claim not found.");
            }
            return (userIdClaim, userRoleClaim);
        }
    }
}
