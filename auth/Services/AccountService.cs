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
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AccountService(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            SignInManager<IdentityUser> signInManager,
            ApplicationDbContext context,
            IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _context = context;
            _httpContextAccessor = httpContextAccessor;
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
            await using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var user = new IdentityUser { UserName = model.Email, Email = model.Email };
                    var result = await _userManager.CreateAsync(user, model.Password);
                    if (!result.Succeeded)
                        return result;

                    //сохранить
                    await _context.SaveChangesAsync();
                    //await transaction.CommitAsync();

                    //временное подтверждение email
                    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    result = await _userManager.ConfirmEmailAsync(user, token);

                    //сохранить
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                    return result;
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    return new IdentityResult();
                }
            }
        }

        public async Task<UserDto>? GetIdentityUser()
        {
            try
            {
                //извлечь токен
                var token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Split(" ").Last();

                //найти пользователя
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;
                var userId = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "unique_name")?.Value;
                var user = await _userManager.FindByIdAsync(userId);
                
                //роли
                var roles = await _userManager.GetRolesAsync(user);
                var rolesList = new List<string>();
                foreach(var role in roles)
                    rolesList.Add(role);
                //
                return new UserDto() 
                { 
                    UserName = user.UserName, 
                    Email = user.Email, 
                    PhoneNumber = user.PhoneNumber,
                    Roles = rolesList
                };
            }
            catch (Exception ex) 
            {
                return null;
            }
        }

        public async Task<IdentityResult> AssignRoleToUser(string email, string role)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    return IdentityResult.Failed(new IdentityError
                    {
                        Description = $"User with email {email} not found."
                    });
                }

                //проверяем, существует ли роль
                var roleExists = await _roleManager.RoleExistsAsync(role);
                if (!roleExists)
                {
                    //создаем роль, если она не существует
                    var roleResult = await _roleManager.CreateAsync(new IdentityRole(role));
                    if (!roleResult.Succeeded)
                        return roleResult;
                }

                //присваиваем пользователю роль
                var result = await _userManager.AddToRoleAsync(user, role);
                return result;
            }
            catch(Exception ex)
            {
                //возвращаем ошибку
                return IdentityResult.Failed(
                    new IdentityError
                    {
                        Description = $"An error occurred while deleting user: {ex.Message}"
                    }
                );
            }
        }
    
        public async Task<IdentityResult> DeleteUserByEmail(string email)
        {
            try
            {
                //находим пользователя по адресу электронной почты
                var user = await _userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    //пользователь не найден, возвращаем ошибку
                    return IdentityResult.Failed(
                        new IdentityError 
                        { 
                            Description = $"User with email '{email}' not found." 
                        }
                    );
                }

                //удаляем пользователя
                var result = await _userManager.DeleteAsync(user);
                return result;
            }
            catch(Exception ex)
            {
                //пользователь не найден, возвращаем ошибку
                return IdentityResult.Failed(
                    new IdentityError
                    {
                        Description = $"An error occurred while deleting user: {ex.Message}"
                    }
                );
            }
        }
    
        public async Task<List<RoleDto>> GetRoles()
        {
            try
            {
                var roles = await _roleManager.Roles.ToListAsync();
                var result = new List<RoleDto>();
                foreach(var role in roles)
                {
                    result.Add(
                        new RoleDto
                        {
                            Name = role.Name,
                            NormalizedName = role.NormalizedName
                        }
                    );
                }
                return result;
            }
            catch(Exception ex)
            {
                return new List<RoleDto>();
            }
        }
    }
}