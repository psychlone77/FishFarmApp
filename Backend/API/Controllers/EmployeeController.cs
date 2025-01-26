using System.Security.Claims;
using BLL.DTOs.Employee;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static API.Utils.Auth;

namespace API.Controllers
{
    [ApiController]
    [Route("api/FishFarms/{fishFarmId}/employees")]
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class EmployeeController(IEmployeeService employeesService) : Controller
    {
        private readonly IEmployeeService _employeesService = employeesService;

        [HttpGet]
        public async Task<ActionResult<List<EmployeeResponseDTO>>> GetEmployees(Guid fishFarmId)
        {
            var (userId, userRole) = GetClaims(User);
            return Ok(await _employeesService.GetEmployees(fishFarmId, userId, userRole));
        }

        [HttpGet]
        [Route("{employeeId}")]
        public async Task<ActionResult<EmployeeResponseDTO>> GetEmployeeById(string employeeId)
        {
            var (userId, userRole) = GetClaims(User);
            return Ok(await _employeesService.GetEmployeeById(employeeId, userId, userRole));
        }

        [HttpPut]
        [Route("{employeeId}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ActionResult<EmployeeResponseDTO>> UpdateEmployee(EmployeeRequestDTO employee, string employeeId)
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

        [HttpPost]
        [Route("assign")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ActionResult> AddEmployeeToFishFarm(AssignmentRequest ar)
        {
            await _employeesService.AddEmployeeToFishFarm(ar.EmployeeId, ar.FishFarmId, ar.PermissionLevel);
            return Ok();
        }
    }
}
