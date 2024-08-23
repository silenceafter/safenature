Клиентская часть:
  - React (app.Client)

Серверная часть:
  - ASP.NET Core Web-API (.NET 7, EntityFrameworkCore (PostgreSQL), Swagger) - app.Server

Сервер аутентификации и авторизации:
  - ASP.NET Core Web-App (.NET 7, Microsoft.AspNetCore.Identity, EntityFrameworkCore (PostgreSQL)) - auth
Email-сервис в проекте использует user secrets. Перед запуском проекта предварительно сохраните требуемые данные в системе:
dotnet user-secrets init
dotnet user-secrets set "Email:Host" "smtp.example.com"
dotnet user-secrets set "Email:Username" "your-email@example.com"
dotnet user-secrets set "Email:Password" "your-password"
