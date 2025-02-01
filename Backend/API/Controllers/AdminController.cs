using BLL.DTOs.Employee;
using BLL.Services;
using BLL.Services.Interfaces;
using DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "SuperAdmin")]
    public class AdminController(IAdminService adminService) : ControllerBase
    {
        private readonly IAdminService _adminService = adminService;

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<IList<EmployeeResponseDTO>>> GetAllAdmins()
        {
            var result = await _adminService.GetAdmins();
            return Ok(result);
        }

        [HttpGet]
        [Route("fishfarms/{fishFarm}")]
        public async Task<ActionResult<IList<EmployeeResponseDTO>>> GetAdmins(Guid fishFarm)
        {
            var result = await _adminService.GetAdmins(fishFarm);
            return Ok(result);
        }

        //[HttpGet]
        //[Route("{adminId}")]
        //public async Task<ActionResult> GetAdmin(string adminId)
        //{

        //}

        [HttpPost]
        [Route("fishfarms/{fishFarm}/assign/{adminId}")]
        public async Task<ActionResult<FishFarmUser>> AssignAdmin(Guid fishFarm, string adminId)
        {
            var result = await _adminService.AddAdminToFishFarm(adminId, fishFarm);
            return Ok(result);
        }

        [HttpPost]
        [Route("fishfarms/{fishFarm}/unassign/{adminId}")]
        public async Task<ActionResult<FishFarmUser>> UnassignAdmin(Guid fishFarm, string adminId)
        {
            var result = await _adminService.RemoveAdminFromFishFarm(adminId, fishFarm);
            return Ok(result);
        }

        [HttpGet]
        [Route("fishfarms/{fishFarmId}/unassigned")]
        public async Task<ActionResult> GetUnassignedAdmins(Guid fishFarmId)
        {
            var result = await _adminService.GetUnassignedAdminsToFishFarm(fishFarmId);
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
