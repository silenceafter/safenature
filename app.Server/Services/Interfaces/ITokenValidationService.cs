namespace app.Server.Services.Interfaces
{
    public interface ITokenValidationService
    {
        Task<bool> Validate(string token);
    }
}
