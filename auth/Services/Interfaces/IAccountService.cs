using auth.DTOs;
using Microsoft.AspNetCore.Identity;

namespace auth.Services.Interfaces
{
    public interface IAccountService
    {
        Task<SignInResult> Login(LoginDto model);
        Task<IdentityResult> Register(RegisterDto model);
    }
}
