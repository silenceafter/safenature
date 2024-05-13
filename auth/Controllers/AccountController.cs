//using auth.Areas.Identity.Pages.Account;
using auth.Services;
using Microsoft.AspNetCore.Mvc;

namespace auth.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return Ok();
        }

        [HttpGet("register/{jj?}")]
        public async Task<IActionResult> Register([FromQuery] string email, string password)
        {
            await _accountService.Register(email, password);
            return Ok();
        }
    }
}
