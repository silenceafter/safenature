using auth.Models;
using Microsoft.AspNetCore.Identity;

namespace auth.Data
{
    public class DefaultResult
    {
        public bool IsSuccessful { get; set; }
        public string Message { get; set; }
        public Exception? Exception { get; set; }
    }
}
