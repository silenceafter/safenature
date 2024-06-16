using app.server.Controllers.Requests;
using app.Server.Controllers.Requests;
using app.Server.Controllers.Response;
using app.Server.Models;
using app.Server.Repositories;
using app.Server.Repositories.Interfaces;
using app.Server.Services;
using app.Server.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace app.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PointController : Controller
    {        
        private readonly ILogger<ReceivingDiscountController> _logger;
        private readonly EcodbContext _context;
        private readonly IEncryptionService _encryptionService;
        private readonly IUserRepository _userRepository;
        private readonly IPointRepository _pointRepository;

        public PointController(
            ILogger<ReceivingDiscountController> logger,
            EcodbContext context,
            IPointRepository pointRepository,
            IEncryptionService encryptionService,
            IUserRepository userRepository)
        {
            _logger = logger;
            _context = context;
            _pointRepository = pointRepository;
            _encryptionService = encryptionService;
            _userRepository = userRepository;            
        }

        [HttpGet("get-points")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProducts()
        {
            var points = await _pointRepository.GetPointsAll();
            return Ok(points);
        }

        [HttpPost("register-product-reserve")]
        [Authorize(Policy = "AllowIfNoRoleClaim")]
        public async Task<IActionResult> RegisterProductReserve([FromBody] ReceivingProductRequest request)
        {
            try
            {
                //пользователь
                var emailHash = _encryptionService.ComputeHash(request.Email);
                var user = await _userRepository.GetUserByEmail(emailHash);

                //пользователь не найден
                if (user == null)
                    return BadRequest();

                var data = await _pointRepository.RegisterProductReserve(request, user);
                return data > 0 ? Ok(data) : BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
