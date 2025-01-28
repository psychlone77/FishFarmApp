using BLL.DTOs.Boat;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static API.Utils.Auth;

namespace API.Controllers
{
    [Route("api/FishFarms/{fishFarmId}/boats")]
    [ApiController]
    [Authorize]
    public class BoatController(IBoatService boatService) : ControllerBase
    {
        private readonly IBoatService _boatService = boatService;

        [HttpGet]
        public async Task<ActionResult<List<BoatDTO>>> GetBoats(Guid fishFarmId)
        {
            var (userId, userRole) = GetClaims(User);
            return Ok(await _boatService.GetBoats(fishFarmId));
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<ActionResult<BoatDTO>> AddBoat(Guid fishFarmId, BoatDTO boatDTO)
        {
            return Ok(await _boatService.AddBoat(fishFarmId, boatDTO));
        }

        [HttpPut("{boatId}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<ActionResult<BoatDTO>> UpdateBoat(Guid fishFarmId, string boatId, BoatDTO boatDTO)
        {
            return Ok(await _boatService.UpdateBoat(fishFarmId, boatId, boatDTO));
        }
    }
}
