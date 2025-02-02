using System.Security.Claims;
using BLL.DTOs.Employee;
using BLL.DTOs.FishFarm;
using BLL.Services.Interfaces;
using DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static API.Utils.Auth;

namespace API.Controllers
{
    [ApiController]
    //[Route("api/FishFarms/{fishFarmId}/employees")]
    [Route("api/[controller]")]
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class EmployeeController(IEmployeeService employeesService) : Controller
    {
        private readonly IEmployeeService _employeesService = employeesService;

        [HttpGet]
        [Route("all")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ActionResult<List<EmployeeResponseDTO>>> GetEmployees()
        {
            return Ok(await _employeesService.GetEmployees());
        }

        [HttpGet]
        [Route("FishFarm/{fishFarmId}")]
        public async Task<ActionResult<List<EmployeeResponseDTO>>> GetEmployees(Guid fishFarmId)
        {
            var (userId, userRole) = GetClaims(User);
            return Ok(await _employeesService.GetEmployeesByFishFarm(fishFarmId, userId, userRole));
        }

        [HttpGet]
        [Route("{employeeId}")]
        public async Task<ActionResult<EmployeeResponseDTO>> GetEmployeeById(string employeeId)
        {
            var (userId, userRole) = GetClaims(User);
            return Ok(await _employeesService.GetEmployeeById(employeeId, userId, userRole));
        }

        [HttpGet]
        [Route("{employeeId}/fishfarms")]
        public async Task<ActionResult<List<FishFarmUserDTO>>> GetFishFarmsByEmployee(string employeeId)
        {
            var (userId, userRole) = GetClaims(User);
            return Ok(await _employeesService.GetFishFarmsByEmployee(employeeId));
        }

        [HttpPut]
        [Route("{employeeId}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ActionResult<EmployeeResponseDTO>> UpdateEmployee([FromForm] EmployeeRequestDTO employee, string employeeId)
        {
            return Ok(await _employeesService.UpdateEmployee(employee, employeeId));
        }

        [HttpDelete]
        [Route("{employeeId}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ActionResult<EmployeeResponseDTO>> DeleteEmployee(string employeeId)
        {
            return Ok(await _employeesService.DeleteEmployee(employeeId));
        }

        [HttpGet]
        [Route("positions")]
        public ActionResult GetPositions()
        {
            return Ok(_employeesService.GetEmployeePositions());
        }

        [HttpPost]
        [Route("FishFarm/{fishFarmId}/assign/{employeeId}")]
        [Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<ActionResult> AddEmployeeToFishFarm(Guid fishFarmId, string employeeId)
        {
            var result = await _employeesService.AddEmployeeToFishFarm(employeeId, fishFarmId);
            return Ok(result);
        }

        [HttpPost]
        [Route("FishFarm/{fishFarmId}/unassign/{employeeId}")]
        [Authorize(Roles = "SuperAdmin,Admin")]
        public async Task<ActionResult> RemoveEmployeeFromFishFarm(Guid fishFarmId, string employeeId)
        {
            var result = await _employeesService.RemoveEmployeeFromFishFarm(employeeId, fishFarmId);
            return Ok(result);
        }

        [HttpGet]
        [Route("FishFarm/{fishFarmId}/unassigned")]
        public async Task<ActionResult> GetUnassignedEmployees(Guid fishFarmId)
        {
            var (userId, userRole) = GetClaims(User);
            var result = await _employeesService.GetUnassignedEmployeesToFishFarm(fishFarmId);
            return Ok(result);
        }
    }
}
