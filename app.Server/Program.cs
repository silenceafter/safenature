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

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddTransient<IAcceptanceRepository, AcceptanceRepository>();
builder.Services.AddTransient<IHazardousWasteRepository, HazardousWasteRepository>();
builder.Services.AddTransient<IPartnerRepository, PartnerRepository>();
builder.Services.AddTransient<IHazardClassRepository, HazardClassRepository>();
builder.Services.AddTransient<IReceivingDiscountRepository, ReceivingDiscountRepository>();
builder.Services.AddDbContext<EcodbContext>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//app.UseMiddleware<AuthorizationMiddleware>();//добавление middleware должно быть перед UseAuthorization()
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");
app.Run();
