using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.Extensions.DependencyInjection;
using app.Server.Models;
using app.Server.Middleware;
using Microsoft.AspNetCore.Authentication.Cookies;
using app.Server.Repositories.Interfaces;
using app.Server.Repositories;
using app.Server.Services.Interfaces;
using app.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using app.Server;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;

var builder = WebApplication.CreateBuilder(args);

//appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

//bind
var settingsJwt = new SettingsJwt();
builder.Configuration.GetSection("JWT").Bind(settingsJwt);

//cors
builder.Services.AddCors(options =>
    options.AddPolicy("hhh", builder =>
    {
        builder.WithOrigins("https://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    })
);

//appsettings: jwt
builder.Services.Configure<SettingsJwt>(builder.Configuration.GetSection("JWT"));

// Add services to the container.
builder.Services.AddControllers();

//identity
//var settingsJwt = builder.Configuration.GetSection("JWT").Get<SettingsJwt>();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = settingsJwt.Issuer,
            ValidAudience = settingsJwt.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settingsJwt.SecretKey))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddTransient<IEncryptionService, EncryptionService>();
builder.Services.AddTransient<IAcceptanceRepository, AcceptanceRepository>();
builder.Services.AddTransient<IHazardousWasteRepository, HazardousWasteRepository>();
builder.Services.AddTransient<IPartnerRepository, PartnerRepository>();
builder.Services.AddTransient<IHazardClassRepository, HazardClassRepository>();
builder.Services.AddTransient<IReceivingDiscountRepository, ReceivingDiscountRepository>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddDbContext<EcodbContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });

    // Add JWT Authentication
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Enter 'Bearer' [space] and then your valid token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
        }  
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("hhh");
app.UseHttpsRedirection();
//app.UseMiddleware<AuthorizationMiddleware>();//добавление middleware должно быть перед UseAuthorization()
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");
app.Run();
