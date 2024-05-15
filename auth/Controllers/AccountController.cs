//using auth.Areas.Identity.Pages.Account;
using auth.DTOs;
using auth.Services;
using auth.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace auth.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IAccountService _accountService;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<IdentityUser> userManager, IAccountService accountService, ITokenService tokenService)
        {
            _userManager = userManager;
            _accountService = accountService;
            _tokenService = tokenService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var result = await _accountService.Login(model);
            if (!result.Succeeded)
                return Unauthorized("Invalid email or password.");

            //генерация токена
            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                var token = _tokenService.GenerateJwtToken(user);
                return Ok(new { Token = token });
            } 
            catch (Exception ex)
            {
                //логирование
            }
            return Unauthorized("Invalid email or password.");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _accountService.Register(model);
            if (result.Succeeded)
                return StatusCode(201);// Если регистрация прошла успешно, возвращаем статус 201 Created
            //
            foreach (var error in result.Errors)
                ModelState.AddModelError(string.Empty, error.Description);
            return BadRequest(ModelState);
        }
    }
}
