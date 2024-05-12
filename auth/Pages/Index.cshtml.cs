using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace auth.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            //параметры запроса
            /*string? redirectUri = HttpContext.Request.Query["redirect_uri"];
            string? clientId = HttpContext.Request.Query["client_id"];*/

            //сохранить, если параметры заданы
            /*if (!String.IsNullOrWhiteSpace(redirectUri))
                HttpContext.Session.SetString("redirectUri", redirectUri);
            if (!String.IsNullOrWhiteSpace(clientId))
                HttpContext.Session.SetString("redirectUri", clientId);*/            
        }
    }
}
