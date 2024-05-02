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
    public class DiscountController : Controller
    {
        private readonly ILogger<DiscountController> _logger;
        private readonly EcodbContext _context;
        private readonly IDiscountRepository _discountRepository;

        public DiscountController(
            ILogger<DiscountController> logger,
            EcodbContext context,
            IDiscountRepository discountRepository
            )
        {
            _logger = logger;
            _context = context;
            _discountRepository = discountRepository;
        }

        /*[HttpPost]
        public async Task<int> RegisterDiscountReserve([FromBody] DiscountRequest request)
        {

        }*/

        [HttpGet]
        public async Task<IActionResult> GetDiscounts()
        {
            var data = await _discountRepository.GetDiscountsAll();
            return Ok(data);
        }
    }
}
