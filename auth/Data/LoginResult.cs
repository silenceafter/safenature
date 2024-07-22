using Microsoft.AspNetCore.Identity;

namespace auth.Data
{
    public class LoginResult
    {
        public IdentityUser? User { get; set; }
        public SignInResult? SignInResult { get; set; }
        public Exception? Exception { get; set; }
    }
}
