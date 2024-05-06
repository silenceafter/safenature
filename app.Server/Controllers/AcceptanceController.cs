using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;

namespace app.Server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AcceptanceController : Controller
    {
        private readonly ILogger<AcceptanceController> _logger;
        private readonly EcodbContext _context;
        private readonly IAcceptanceRepository _acceptanceRepository;

        public AcceptanceController(
            ILogger<AcceptanceController> logger, 
            EcodbContext context,
            IAcceptanceRepository acceptanceRepository
            )
        {
            _logger = logger;
            _context = context;
            _acceptanceRepository = acceptanceRepository;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterDispose([FromBody] List<AcceptanceRequest> request)
        {
            var data = await _acceptanceRepository.RegisterDispose(request);
            return Ok(data);
        }

        /*[HttpGet]
        public async Task<IActionResult> GetDisposeAll()
        {
            var data = await _wasteDisposalRepository.GetDisposeAll();
            return Ok(data);           
        }*/

        //действие по умолчанию при обращении к ecoproducts/, например, список товаров
        //выдать карточку конкретного товара
        //CRUD для товара
        //возможно, CRUD для категорий товара
        //"приобрести" товар за бонусы
        //какие еще действия могут быть с товарами?

        /*public IActionResult Index()
        {
            return View();
        }*/
    }
}
