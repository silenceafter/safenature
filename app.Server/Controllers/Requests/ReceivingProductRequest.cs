using app.Server.Models;

namespace app.server.Controllers.Requests
{
    public class ReceivingProductRequest
    {
        public string Email { get; set; }
        public List<Product>? Products { get; set; }
    }
}
