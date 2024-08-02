using auth.Models;
using Microsoft.AspNetCore.Identity;

namespace auth.Data
{
    public class LogoutResult
    {
        public IdentityUser? User { get; set; }
        public bool IsSignedIn { get; set; }
        public BlacklistedToken? BlacklistedToken { get; set; }
        public Exception? Exception { get; set; }
    }
}
