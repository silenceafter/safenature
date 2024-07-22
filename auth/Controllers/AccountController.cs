﻿//using auth.Areas.Identity.Pages.Account;
using auth.DTOs;
using auth.Models;
using auth.Services;
using auth.Services.Interfaces;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI.Common;
using System.Data;
using System.Security.Claims;
using System.Web.Helpers;

namespace auth.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IAccountService _accountService;
        private readonly ITokenService _tokenService;
        private readonly EmailService _emailService;

        public AccountController(
            UserManager<IdentityUser> userManager, 
            IAccountService accountService, 
            ITokenService tokenService,
            EmailService emailService)
        {
            _userManager = userManager;
            _accountService = accountService;
            _tokenService = tokenService;
            _emailService = emailService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));

            //регистрация
            var (result, user) = await _accountService.Register(model);
            if (user == null) {
                var errorMessages = result.Errors.Select(error => error.Description).ToArray();
                return BadRequest(new { Error = $"Пользователь {model.Username} не зарегистрирован.", Details = errorMessages });
            }

            //DTO
            UserDto userDto = new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                EmailConfirmed = user.EmailConfirmed,
                PhoneNumber = user.PhoneNumber,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                Roles = new List<string> { "User" }
            };
            return Created(string.Empty, userDto);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            try
            {
                //вход пользователя в систему
                var result = await _accountService.Login(model);
                if (result.Exception != null) 
                {
                    //исключение
                    var errorMessages = new[] { result.Exception.Message };
                    return BadRequest(new { Error = result.Exception.Message, Details = errorMessages });
                }
                else if (result.User == null)
                {
                    //пользователь не найден
                    return BadRequest(new { Error = $"Пользователь {model.Email} не зарегистрирован." });
                }
                else
                {
                    //ошибка SignInResult
                    if (result.SignInResult == null)
                    {
                        return BadRequest(
                            new
                            {
                                Error = $"Вход в систему пользователем {model.Email} не выполнен",
                                Details = new[] { "Отсутствует результат SignInResult" }
                            });
                    }

                    //пользователь найден, вход не выполнен
                    if (!result.SignInResult.Succeeded) 
                    {
                        var message = result.SignInResult switch
                        {
                            { Succeeded: true } => "Вход выполнен успешно.",
                            { IsLockedOut: true } => "Учетная запись заблокирована.",
                            { IsNotAllowed: true } => "Вход не разрешен. Пожалуйста, подтвердите вашу учетную запись.",
                            { RequiresTwoFactor: true } => "Требуется двухфакторная аутентификация.",
                            _ => "Неудачная попытка входа. Проверьте электронную почту и пароль."
                        };
                        var errorMessages = new[] { message };
                        return BadRequest(
                            new 
                            { 
                                Error = $"Вход в систему пользователем {model.Email} не выполнен", 
                                Details = errorMessages 
                            });
                    }
                }                

                //роли пользователя
                var roles = await _userManager.GetRolesAsync(result.User);

                //генерировать токен
                var token = _tokenService.GenerateJwtToken(result.User);
                if (token == null)
                {                   
                    return BadRequest(
                        new 
                        { 
                            Error = $"Для пользователя {model.Email} вход не выполнен", 
                            Detault = new[] { "Не удалось сгенерировать токен" } 
                        });
                }
                return Ok(new { UserName = result.User.UserName, Roles = roles, Token = token });
            }
            catch (Exception ex) 
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("logout")]
        [AllowAnonymous]//[Authorize(Policy = "AllowIfNoRoleClaim")]
        public async Task<IActionResult> Logout()
        {
            return await _accountService.Logout()
                ? Ok()
                : BadRequest("Произошла ошибка при обработке токена");
        }

        [HttpPost("forgot")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                BadRequest();
            //
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var urlHelper = new UrlHelper(ControllerContext);
            var callbackUrl = urlHelper.Action("ResetPassword", "Account", new { token, model.Email }, urlHelper.ActionContext.HttpContext.Request.Scheme);

            //отправить email с ссылкой на сброс пароля
            await _emailService.SendEmailAsync(model.Email, "Reset Password", $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");
            return Ok(new { message = "Отправлена ссылка на сброс пароля пользователя" });
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

        /*[HttpPost("update-role")]
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
        }*/

        /*[HttpGet("get-user")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _accountService.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }*/

        [HttpGet("test")]
        public async Task<IActionResult> Test()
        {
            if (User.Identity.IsAuthenticated)
            {
                var userName = User.Identity.Name;//получить имя пользователя
                var userId = User.FindFirst(ClaimTypes.Name)?.Value;
            }


            return Ok();
        }

    }
}