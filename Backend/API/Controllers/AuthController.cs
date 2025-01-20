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
        [Route("employee/login")]
        public async Task<ActionResult> EmployeeLogin(LoginRequest loginRequest)
        {
            return Ok(await _authService.EmployeeLogin(loginRequest));
        }

        [HttpPost]
        [Route("employee/register")]
        public async Task<ActionResult> EmployeeRegister(EmployeeRegisterDTO registerRequest)
        {
            return Ok(await _authService.EmployeeRegister(registerRequest));
        }

        [HttpGet]
        [Route("employee/test-auth")]
        [Authorize]
        public Task<ActionResult> TestAuth()
        {
            return Task.FromResult<ActionResult>(Ok("Authorized"));
        }
    }
}
