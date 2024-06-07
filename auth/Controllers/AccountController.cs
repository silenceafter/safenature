//using auth.Areas.Identity.Pages.Account;
using auth.DTOs;
using auth.Models;
using auth.Services;
using auth.Services.Interfaces;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;

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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var result = await _accountService.Login(model);
            if (!result)
                return Unauthorized("Invalid email or password.");

            //генерация токена
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return Unauthorized("User not found");
            //
            var token = _tokenService.GenerateJwtToken(user);
            if (token == null) 
                return Unauthorized("Invalid email or password.");
            return Ok(new { Token = token });
        }

        [HttpPost("logout")]
        [AllowAnonymous]//[Authorize(Policy = "AllowIfNoRoleClaim")]
        public async Task<IActionResult> Logout()
        {
            return await _accountService.Logout()
                ? Ok()
                : BadRequest("Произошла ошибка при обработке токена");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            //
            var result = await _accountService.Register(model);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                    ModelState.AddModelError(string.Empty, error.Description);
                return BadRequest(ModelState);
            }
               
            //присваиваем пользователю роль "User"
            var roleResult = await _accountService.AssignRoleToUser(model.Email, "User");
            if (!roleResult.Succeeded)
            {
                //если присвоение роли не удалось, откатываем регистрацию пользователя
                await _accountService.DeleteUserByEmail(model.Email);
                foreach (var error in roleResult.Errors)
                    ModelState.AddModelError(string.Empty, error.Description);
                return BadRequest(ModelState);
            }
            return StatusCode(201);//201 Created           
        }

        [HttpPost("validate")]
        //[Authorize]
        public async Task<IActionResult> Validate()
        {
            if (await _tokenService.ValidateJwtToken())
                return Ok(true);
            return Unauthorized();
        }

        [HttpGet("get-current-user")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            { 
                var user = await _accountService.GetIdentityUser();
                return Ok(user);
            }
            catch (Exception ex) 
            {
                return BadRequest();
            }
        }

        [HttpGet("get-current-role")]
        [Authorize(Policy = "AllowIfNoRoleClaim")]
        public async Task<IActionResult> GetRole()
        {
            var user = await _accountService.GetIdentityUser();
            if (user != null)
                return Ok(user.Roles);
            return BadRequest(
                IdentityResult.Failed(
                    new IdentityError
                    {
                        Description = $"Ошибка предоставления сведений о роли пользователю"
                    }
                )
            );
        }

        [HttpGet("get-roles")]
        [Authorize(Policy = "AllowIfNoRoleClaim")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _accountService.GetRoles();
            return Ok(roles);
        }

        [HttpPost("update-role")]
        [Authorize]
        public async Task<IActionResult> UpdateRole(string email, string role)
        {
            var result = await _accountService.AssignRoleToUser(email, role);
            if (result.Succeeded)
                return Ok(result);
            return BadRequest(
                IdentityResult.Failed(
                    new IdentityError
                    {
                        Description = $"Ошибка присвоения новой роли пользователю"
                    }
                )
            );
        }                        
    }
}