﻿//using auth.Areas.Identity.Pages.Account;
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
            if (!result.Succeeded)
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
        [Authorize]
        public async Task<IActionResult> Logout(/*[FromBody] LogoutDto model*/)
        {
            //получить токен
            var token = await _tokenService.GetJwtTokenFromHeader();
            if (token == null)
                return BadRequest("Произошла ошибка при обработке токена");
            //
            var blacklistedToken = new BlacklistedToken
            {
                Token = token,
                ExpirationDate = DateTime.UtcNow.AddHours(1) //срок действия токена
            };
            return await _tokenService.AddJwtTokenToBlacklist(blacklistedToken) > 0 
                ? Ok() 
                : BadRequest();
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

        [HttpGet("validate")]
        [Authorize]
        public async Task<IActionResult> Validate()
        {
            try
            {
                var result = await _tokenService.ValidateJwtToken();
                return StatusCode(200, result);
            }
            catch(Exception ex) 
            {
                return StatusCode(200, false);
            }
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

        [HttpGet("get-roles")]
        [Authorize]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _accountService.GetRoles();
            return Ok(roles);
        }

        [HttpPost("set-role")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SetRole(string role)
        {

        }
    }
}
