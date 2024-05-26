using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories;
using app.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app.Server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ReceivingDiscountController : Controller
    {
        private readonly ILogger<ReceivingDiscountController> _logger;
        private readonly EcodbContext _context;
        private readonly IReceivingDiscountRepository _receivingDiscountRepository;

        public ReceivingDiscountController(
            ILogger<ReceivingDiscountController> logger,
            EcodbContext context,
            IReceivingDiscountRepository receivingDiscountRepository
            )
        {
            _logger = logger;
            _context = context;
            _receivingDiscountRepository = receivingDiscountRepository;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> RegisterDiscountReserve([FromBody] ReceivingDiscountRequest request)
        {
            var data = await _receivingDiscountRepository.RegisterDiscountReserve(request);
            return Ok(data);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetDiscounts()
        {
            var data = await _receivingDiscountRepository.GetDiscountsAll();
            return Ok(data);
        }
    }
}
