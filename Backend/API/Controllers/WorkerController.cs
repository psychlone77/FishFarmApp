using System.Security.Claims;
using BLL.DTOs.Workers;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("FishFarms/{fishFarmId}/workers")]
    [Authorize]
    public class WorkerController(IWorkersService workersService) : Controller
    {
        private readonly IWorkersService _workersService = workersService;

        [HttpGet]
        public async Task<ActionResult<List<WorkerResponseDTO>>> GetWorkers(Guid fishFarmId)
        {
            var userId = GetUserId();
            return Ok(await _workersService.GetWorkers(fishFarmId, userId));
        }

        [HttpGet]
        [Route("{workerId}")]
        public async Task<ActionResult<WorkerResponseDTO>> GetWorkerById(Guid workerId)
        {
            var userId = GetUserId();
            return Ok(await _workersService.GetWorkerById(workerId, userId));
        }

        [HttpPost]
        public async Task<ActionResult<WorkerResponseDTO>> AddWorker(WorkerRequestDTO worker, Guid fishFarmId)
        {
            var userId = GetUserId();
            return Ok(await _workersService.AddWorker(worker, fishFarmId, userId));
        }

        [HttpPut]
        [Route("{workerId}")]
        public async Task<ActionResult<WorkerResponseDTO>> UpdateWorker(WorkerRequestDTO worker, Guid workerId)
        {
            var userId = GetUserId();
            return Ok(await _workersService.UpdateWorker(worker, workerId, userId));
        }

        [HttpDelete]
        [Route("{workerId}")]
        public async Task<ActionResult<WorkerResponseDTO>> DeleteWorker(Guid workerId)
        {
            var userId = GetUserId();
            return Ok(await _workersService.DeleteWorker(workerId, userId));
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
