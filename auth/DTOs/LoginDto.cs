using System.ComponentModel.DataAnnotations;

namespace auth.DTOs
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Email обязателен")]
        [EmailAddress(ErrorMessage = "Некорректный email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Пароль обязателен")]
        public string Password { get; set; }
    }
}
