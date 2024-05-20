using app.Server.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text.Json;
using System.Net.Http.Headers;

namespace app.Server.Services
{
    public class TokenValidationService : ITokenValidationService
    {
        private readonly HttpClient _httpClient;

        public TokenValidationService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<bool> Validate(string token)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await _httpClient.GetAsync("https://localhost:7086/account/validate");
                return response.IsSuccessStatusCode;           
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
