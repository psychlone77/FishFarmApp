using BLL.Services;
using BLL.Services.Interfaces;
using DAL.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController(IAdminService adminService) : ControllerBase
    {
        private readonly IAdminService _adminService = adminService;
        [HttpPost]
        [Route("{fishFarm}/assign/{adminId}")]
        public async Task<ActionResult<FishFarmUser>> AssignAdmin(Guid fishFarm, string adminId)
        {
            var result = await _adminService.AddAdminToFishFarm(adminId, fishFarm);
            return Ok(result);
        }

        //[HttpPost]
        //[Route("upload")]
        //public async Task<ActionResult> UploadFile(IFormFile file)
        //{
        //    await using var stream = file.OpenReadStream();
        //    await _fileService.UploadFile("test-container", file.FileName, stream);
        //    return Ok();
        //}
    }
}
