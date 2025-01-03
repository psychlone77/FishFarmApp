using BLL.Services.Interfaces;
using DAL.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FishFarmController(IFishFarmsService fishFarmsService) : Controller
    {
        private readonly IFishFarmsService _fishFarmsService = fishFarmsService;

        [HttpGet]
        public async Task<ActionResult<List<FishFarmEntity>>> GetAllFishFarms()
        {
            return Ok(await _fishFarmsService.GetAllFishFarms());
        }
    }
}
