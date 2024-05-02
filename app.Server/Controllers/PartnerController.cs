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
    public class PartnerController : Controller
    {
        private readonly ILogger<PartnerController> _logger;
        private readonly EcodbContext _context;
        private readonly IPartnerRepository _partnerRepository;

        public PartnerController(
            ILogger<PartnerController> logger,
            EcodbContext context,
            IPartnerRepository partnerRepository
            )
        {
            _logger = logger;
            _context = context;
            _partnerRepository = partnerRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetPartners()
        {
            var data = await _partnerRepository.GetPartnersAll();
            return Ok(data);
        }
    }
}
