using BLL.DTOs.Employee;
using BLL.DTOs.User;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        private readonly IAuthService _authService = authService;

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> EmployeeLogin(LoginRequest loginRequest)
        {
            return Ok(await _authService.EmployeeLogin(loginRequest));
        }

        [HttpPost]
        [Route("employee/register")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ActionResult> EmployeeRegister(EmployeeRegisterDTO registerRequest)
        {
            return Ok(await _authService.EmployeeRegister(registerRequest));
        }

        [HttpPost]
        [Route("admin/register")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ActionResult> AdminRegister(EmployeeRegisterDTO registerRequest)
        {
            return Ok(await _authService.AdminRegister(registerRequest));
        }

        [HttpGet]
        [Route("validate-token")]
        [Authorize]
        public Task<ActionResult> ValidateToken()
        {
            return Task.FromResult<ActionResult>(Ok("Token is valid"));
        }

        [HttpGet]
        [Route("test-auth-sa")]
        [Authorize(Roles = "SuperAdmin")]
        public Task<ActionResult> TestSuperAdminAuth()
        {
            return Task.FromResult<ActionResult>(Ok("Authorized"));
        }

        [HttpGet]
        [Route("test-auth-admin")]
        [Authorize(Roles = "Admin")]
        public Task<ActionResult> TestAdminAuth()
        {
            return Task.FromResult<ActionResult>(Ok("Authorized"));
        }

        [HttpGet]
        [Route("test-auth-employee")]
        [Authorize(Roles = "Employee")]
        public Task<ActionResult> TestEmployeeAuth()
        {
            return Task.FromResult<ActionResult>(Ok("Authorized"));
        }
    }


}
