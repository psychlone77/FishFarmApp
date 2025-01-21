using System.Security.Claims;
using BLL.DTOs.Employee;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/FishFarms/{fishFarmId}/employees")]
    [Authorize]
    public class EmployeeController(IEmployeeService employeesService) : Controller
    {
        private readonly IEmployeeService _employeesService = employeesService;

        [HttpGet]
        public async Task<ActionResult<List<EmployeeResponseDTO>>> GetEmployees(Guid fishFarmId)
        {
            var userId = GetUserId();
            return Ok(await _employeesService.GetEmployees(fishFarmId, userId));
        }

        [HttpGet]
        [Route("{employeeId}")]
        public async Task<ActionResult<EmployeeResponseDTO>> GetEmployeeById(string employeeId)
        {
            var userId = GetUserId();
            return Ok(await _employeesService.GetEmployeeById(employeeId, userId));
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeResponseDTO>> AddEmployee(EmployeeRequestDTO employee, Guid fishFarmId)
        {
            var userId = GetUserId();
            return Ok(await _employeesService.AddEmployee(employee, fishFarmId, userId));
        }

        [HttpPut]
        [Route("{employeeId}")]
        public async Task<ActionResult<EmployeeResponseDTO>> UpdateEmployee(EmployeeRequestDTO employee, string employeeId)
        {
            var userId = GetUserId();
            return Ok(await _employeesService.UpdateEmployee(employee, employeeId, userId));
        }

        [HttpDelete]
        [Route("{employeeId}")]
        public async Task<ActionResult<EmployeeResponseDTO>> DeleteEmployee(string employeeId)
        {
            var userId = GetUserId();
            return Ok(await _employeesService.DeleteEmployee(employeeId, userId));
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
