using BLL.DTOs.Employee;
using BLL.DTOs.User;
using static API.Utils.Auth;
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
        [Authorize(Roles = "SuperAdmin,Roles")]
        public async Task<ActionResult> EmployeeRegister([FromForm] EmployeeRegisterDTO registerRequest)
        {
            return Ok(await _authService.EmployeeRegister(registerRequest, DAL.Entities.UserRole.Employee));
        }

        [HttpPost]
        [Route("admin/register")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<ActionResult> AdminRegister([FromForm] EmployeeRegisterDTO registerRequest)
        {
            return Ok(await _authService.EmployeeRegister(registerRequest, DAL.Entities.UserRole.Admin));
        }

        [HttpGet]
        [Route("me")]
        [Authorize]
        public async Task<ActionResult> GetMyDetails()
        {
            var (userId, _) = GetClaims(User);
            return Ok(await _authService.GetMyDetails(Guid.Parse(userId)));
        }

        [HttpPut]
        [Route("email")]
        [Authorize]
        public async Task<ActionResult> UpdateMyEmail(UpdateEmailRequest emailRequest)
        {
            var (userId, _) = GetClaims(User);
            var email = await _authService.UpdateMyEmail(Guid.Parse(userId), emailRequest.Email);
            return Ok(email);
        }

        [HttpPut]
        [Route("password")]
        [Authorize]
        public async Task<ActionResult> UpdateMyPassword(UpdatePasswordRequest passwordRequest)
        {
            var (userId, _) = GetClaims(User);
            await _authService.UpdateMyPassword(Guid.Parse(userId), passwordRequest.OldPassword, passwordRequest.NewPassword);
            return Ok();
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
