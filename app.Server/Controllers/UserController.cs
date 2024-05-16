using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories;
using app.Server.Repositories.Interfaces;
using app.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace app.Server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;
        private readonly EcodbContext _context;
        private readonly IEncryptionService _encryptionService;
        private readonly IUserRepository _userRepository;

        public UserController(
            ILogger<UserController> logger,
            EcodbContext context,
            IEncryptionService encryptionService,
            IUserRepository userRepository
            )
        {
            _logger = logger;
            _context = context;
            _encryptionService = encryptionService;
            _userRepository = userRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserRequest request)
        {
            var user = await _userRepository.GetUserByEmail(request.Email);
            if (user != null)
                return Ok(0);

            //пользователь найден
            var encrypt = _encryptionService.Encrypt(request.Email);
            var id = await _userRepository.Create(encrypt);
            return Ok(id);            
        }
    }
}
