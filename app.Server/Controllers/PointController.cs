using app.Server.Controllers.Requests;
using app.Server.Controllers.Response;
using app.Server.Models;
using app.Server.Repositories;
using app.Server.Repositories.Interfaces;
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
    }
}
