using app.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace app.Server.Controllers
{
    /*[EnableCors("hhh")]*/
    [ApiController]
    [Route("[controller]/[action]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly OgtContext _context;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, OgtContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await _context.Materials.ToListAsync();//ToListAsync();
            return Ok(data);           
        }

        [HttpGet]
        public IActionResult MyRedirect() 
        {
            return Redirect("https://localhost:7086/Identity/Account/Login");
        }
    }
}
