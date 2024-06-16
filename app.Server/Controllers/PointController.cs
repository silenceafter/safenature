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
        private readonly IPointRepository _pointRepository;

        public PointController(IPointRepository pointRepository)
        {
            _pointRepository = pointRepository;
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
        public async Task<IActionResult> RegisterProductReserve([FromBody] ProductRequest request)
        {
            try
            {
                //пользователь
                var emailHash = _encryptionService.ComputeHash(request.Email);
                var user = await _userRepository.GetUserByEmail(emailHash);

                //пользователь не найден
                if (user == null)
                    return BadRequest();

                var data = await _receivingDiscountRepository.RegisterDiscountReserve(request, user);
                return data > 0 ? Ok(data) : BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
