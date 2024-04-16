using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace app.Server.Middleware
{
    public class AuthorizationMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthorizationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            // Проверяем, авторизован ли пользователь
            /*if (!context.User.Identity.IsAuthenticated)
            */
                // Перенаправляем пользователя на сервис авторизации
                context.Response.Redirect("/login"); // Замените "/login" на URL вашего сервиса авторизации
                return;
            //}

            // Продолжаем выполнение запроса
            await _next(context);
        }
    }

    public static class AuthorizationMiddlewareExtensions
    {
        public static IApplicationBuilder UseAuthorizationMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthorizationMiddleware>();
        }
    }
}
