using auth.Data;

namespace auth.Services.Interfaces
{
    public interface IEmailService
    {
        Task<DefaultResult> SendEmailAsync(string email, string subject, string message);
    }
}
