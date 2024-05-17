using auth.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using auth.DTOs;
using Microsoft.Extensions.Options;

namespace auth.Services
{
    public class TokenService : ITokenService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILogger<TokenService> _logger;
        private readonly SettingsJwtDto _settingsJwtDto;

        public TokenService(ILogger<TokenService> logger, IHttpContextAccessor httpContextAccessor, IOptions<SettingsJwtDto> settingsJwtDto)
        {
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
            _settingsJwtDto = settingsJwtDto.Value;
        }

        public async Task<string> GenerateJwtToken(IdentityUser user)
        {
            try
            {
                //создание токена JWT
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_settingsJwtDto.SecretKey);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.Id) }), // Используем клеймы текущего пользователя
                    Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_settingsJwtDto.ExpirationMinutes)),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                    Issuer = _settingsJwtDto.Issuer,//"https://localhost:7086/"
                    Audience = _settingsJwtDto.Audience
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating token.");
                return "";
            }
        }
    }
}