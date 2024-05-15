//using auth.Areas.Identity.Pages.Account;
using auth.DTOs;
using auth.Services;
using auth.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace auth.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return Ok();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var result = await _accountService.Register(model);
            if (result.Succeeded)
                return Ok(new { Message = "User registered successfully" });
            //
            foreach (var error in result.Errors)
                ModelState.AddModelError(string.Empty, error.Description);
            return BadRequest(ModelState);
        }
    }
}
