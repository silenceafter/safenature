using System.ComponentModel.DataAnnotations;

namespace auth.DTOs
{
    public class LogoutDto
    {
        [Required(ErrorMessage = "Email обязателен")]
        [EmailAddress(ErrorMessage = "Некорректный email")]
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
