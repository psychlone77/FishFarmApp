using BLL.DTOs.Boat;
using BLL.Services.Interfaces;
using DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static API.Utils.Auth;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BoatController(IBoatService boatService, IAuthService authService) : ControllerBase
    {
        private readonly IBoatService _boatService = boatService;
        private readonly IAuthService _authService = authService;

        [HttpGet]
        [Route("fishfarm/{fishFarmId}")]
        public async Task<ActionResult<List<BoatDTO>>> GetBoats(Guid fishFarmId)
        {
            //var (userId, userRole) = GetClaims(User);
            return Ok(await _boatService.GetBoats(fishFarmId));
        }

        [HttpGet]
        [Route("all")]
        [Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<ActionResult> GetAllBoats()
        {
            var (userId, userRole) = GetClaims(User);
            if (userRole == "SuperAdmin")
                return Ok(await _boatService.GetAllBoats());
            else
                return Ok(await _boatService.GetAllBoats(Guid.Parse(userId)));
        }

        [HttpPost]
        [Route("fishfarm/{fishFarmId}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<ActionResult<BoatDTO>> AddBoat(Guid fishFarmId, BoatDTO boatDTO)
        {
            return Ok(await _boatService.AddBoat(fishFarmId, boatDTO));
        }

        [HttpPut]
        [Route("fishfarm/{fishFarmId}/{boatId}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<ActionResult<BoatDTO>> UpdateBoat(Guid fishFarmId, string boatId, BoatDTO boatDTO)
        {
            return Ok(await _boatService.UpdateBoat(fishFarmId, boatId, boatDTO));
        }

        [HttpDelete]
        [Route("fishfarm/{fishFarmId}/{boatId}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<ActionResult<BoatDTO>> DeleteBoat(Guid fishFarmId, string boatId)
        {
            var (userId, userRole) = GetClaims(User);
            if (userRole != "SuperAdmin")
                await _authService.CheckFishFarmAccess(fishFarmId, userId, PermissionLevel.Delete);
            return Ok(await _boatService.DeleteBoat(fishFarmId, boatId));
        }

        [HttpPost]
        [Route("fishfarm/{fishFarmId}/{boatId}/reassign/{newFishFarmId}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<ActionResult<BoatDTO>> ReassignBoat(Guid fishFarmId, string boatId, Guid newFishFarmId)
        {
            return Ok(await _boatService.ReassignBoat(fishFarmId, boatId, newFishFarmId));
        }
    }
}
