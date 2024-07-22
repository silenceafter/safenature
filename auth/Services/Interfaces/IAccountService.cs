using auth.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace auth.Services.Interfaces
{
    public interface IAccountService
    {
        Task<(IdentityResult Result, IdentityUser? User)> Register(RegisterDto model, string role = "User");
        Task<Dictionary<string, string[]>> Login(LoginDto model);
        Task<bool> Logout();
        //Task<IdentityResult> Forgot(ForgotDto model);
        Task<UserDto>? GetIdentityUser();
        Task<IdentityResult> AssignRoleToUserByEmail(string email, string role = "User");
        Task<IdentityResult> AssignRoleToUserByEmail(IdentityUser user, string role = "User");
        Task<IdentityResult> DeleteUserByEmail(string email);
        Task<List<RoleDto>> GetRoles();
        Task<IdentityUser>? GetUserByEmailOrUsername(string email, string username);
    }
}
