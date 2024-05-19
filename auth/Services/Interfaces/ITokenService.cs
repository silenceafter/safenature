using auth.Models;
using Microsoft.AspNetCore.Identity;

namespace auth.Services.Interfaces
{
    public interface ITokenService
    {
        Task<int> AddTokenToBlacklist(BlacklistedToken blacklistedToken);
        Task<string> GenerateJwtToken(IdentityUser user);
    }
}
