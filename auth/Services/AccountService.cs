//using auth.Areas.Identity.Pages.Account;
using auth.Data;
using auth.DTOs;
using auth.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
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
        private readonly ApplicationDbContext _context;

        public AccountService(
            UserManager<IdentityUser> userManager, 
            SignInManager<IdentityUser> signInManager,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
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
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var user = new IdentityUser { UserName = model.Email, Email = model.Email };
                    var result = await _userManager.CreateAsync(user, model.Password);
                    if (!result.Succeeded)
                        return result;

                    //сохранить
                    await _context.SaveChangesAsync();
                    transaction.Commit();

                    //временное подтверждение email
                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    result = await _userManager.ConfirmEmailAsync(user, token);

                    //сохранить
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                    return result;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return new IdentityResult();
                }
            }
        }
    }
}