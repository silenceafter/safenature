using Microsoft.AspNetCore.Identity;

namespace auth.Data
{
    public class RegisterResult
    {
        public IdentityResult Result { get; set; }
        public IdentityUser? User { get; set; }        
    }
}
