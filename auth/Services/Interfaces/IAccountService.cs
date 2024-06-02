using auth.DTOs;
using Microsoft.AspNetCore.Identity;

namespace auth.Services.Interfaces
{
    public interface IAccountService
    {
        Task<SignInResult> Login(LoginDto model);
        Task<IdentityResult> Register(RegisterDto model);
        Task<UserDto>? GetIdentityUser();
        Task<IdentityResult> AssignRoleToUser(string email, string role);
        Task<IdentityResult> DeleteUserByEmail(string email);
        Task<List<RoleDto>> GetRoles();
    }
}
