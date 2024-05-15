using Microsoft.AspNetCore.Identity;

namespace auth.Services.Interfaces
{
    public interface ITokenService
    {
        Task<string> GenerateJwtToken(IdentityUser user);
    }
}
