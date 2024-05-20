using app.Server.Controllers.Requests;
using app.Server.Models;
using app.Server.Repositories;
using app.Server.Repositories.Interfaces;
using app.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet]
        [Authorize]
        public IActionResult GetSecureData()
        {
            return Ok("111");
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Login([FromBody] UserRequest request)
        {
            try
            {             
                //валидация токена
                //_encryptionService.Validate()

                var encrypt = _encryptionService.Encrypt(request.Email);
                var emailHash = _encryptionService.ComputeHash(request.Email);
                //
                var user = await _userRepository.GetUserByEmail(emailHash);
                if (user != null)//токен опознан
                    return Ok(user.Id);

                //пользователь не найден -> регистрируем по email в зашифрованном виде
                var response = await _userRepository.Create(encrypt, emailHash);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Ok(0);
            }            
        }       
    }
}