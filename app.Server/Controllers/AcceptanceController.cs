using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories;
using app.Server.Repositories.Interfaces;
using app.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IEncryptionService _encryptionService;
        private readonly IUserRepository _userRepository;

        public AcceptanceController(
            ILogger<AcceptanceController> logger, 
            EcodbContext context,
            IAcceptanceRepository acceptanceRepository,
            IEncryptionService encryptionService,
            IUserRepository userRepository)
        {
            _logger = logger;
            _context = context;
            _acceptanceRepository = acceptanceRepository;
            _encryptionService = encryptionService;
            _userRepository = userRepository;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> RegisterDispose([FromBody] List<AcceptanceRequest> request)
        {
            try
            {
                //
                //пользователь
                var emailHash = _encryptionService.ComputeHash(request[0].Email);
                var user = await _userRepository.GetUserByEmail(emailHash);

                //пользователь не найден
                if (user == null)
                    return BadRequest();

                //регистрируем прием
                var data = await _acceptanceRepository.RegisterDispose(request, user);
                return Ok(data);
            }
            catch(Exception ex)
            {
                return BadRequest();
            }            
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
