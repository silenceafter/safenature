using System.ComponentModel.DataAnnotations;

namespace app.Server.Controllers.Requests
{
    public class AcceptanceRequest
    {
        public string Email { get; set; }
        public int HazardousWasteId { get; set; }
        public int Quantity { get; set; }
    }
}
