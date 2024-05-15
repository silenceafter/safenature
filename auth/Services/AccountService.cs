//using auth.Areas.Identity.Pages.Account;
using auth.DTOs;
using auth.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace auth.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AccountService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<SignInResult> Login(LoginDto model)
        {
            try
            {
                //пользователь
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                    return SignInResult.Failed;//пользователь не найден

                //вход по паролю
                return await _signInManager.PasswordSignInAsync(user, model.Password, false, lockoutOnFailure: true);
            }
            catch (Exception ex)
            {
                //логирование
            }
            return SignInResult.Failed;
        }

        public async Task<IdentityResult> Register(RegisterDto model)
        {
            try
            {
                var user = new IdentityUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);//временное подтверждение email
                return result;
            }
            catch (Exception ex)
            {
                //логирование
                throw;
            }              
        }
    }
}