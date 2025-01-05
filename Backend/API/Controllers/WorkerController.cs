using BLL.DTOs.Workers;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("FishFarm/{fishFarmId}/workers")]
    public class WorkerController(IWorkersService workersService) : Controller
    {
        private readonly IWorkersService _workersService = workersService;

        [HttpGet]
        public async Task<ActionResult<List<WorkerResponseDTO>>> GetWorkers(Guid fishFarmId)
        {
            return Ok(await _workersService.GetWorkers(fishFarmId));
        }

        [HttpGet]
        [Route("{workerId}")]
        public async Task<ActionResult<WorkerResponseDTO>> GetWorkerById(Guid workerId)
        {
            return Ok(await _workersService.GetWorkerById(workerId));
        }

        [HttpPost]
        public async Task<ActionResult<WorkerResponseDTO>> AddWorker(WorkerRequestDTO worker, Guid fishFarmId)
        {
            return Ok(await _workersService.AddWorker(worker, fishFarmId));
        }

        [HttpPut]
        [Route("{workerId}")]
        public async Task<ActionResult<WorkerResponseDTO>> UpdateWorker(WorkerRequestDTO worker, Guid workerId)
        {
            return Ok(await _workersService.UpdateWorker(worker, workerId));
        }

        [HttpDelete]
        [Route("{workerId}")]
        public async Task<ActionResult<WorkerResponseDTO>> DeleteWorker(Guid workerId)
        {
            return Ok(await _workersService.DeleteWorker(workerId));
        }
    }
}
