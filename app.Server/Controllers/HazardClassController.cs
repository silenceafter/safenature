using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories;
using app.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app.Server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class HazardClassController : Controller
    {
        private readonly ILogger<HazardClassController> _logger;
        private readonly EcodbContext _context;
        private readonly IHazardClassRepository _hazardClassRepository;

        public HazardClassController(
            ILogger<HazardClassController> logger,
            EcodbContext context,
            IHazardClassRepository hazardClassRepository
            )
        {
            _logger = logger;
            _context = context;
            _hazardClassRepository = hazardClassRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetHazardClasses()
        {
            var data = await _hazardClassRepository.GetHazardClassAll();
            return Ok(data);
        }
    }
}
