// Import necessary namespaces
using BLL.Services;
using BLL.Services.Interfaces;
using DAL.Data;
using DAL.Entities;
using DAL.Repository;
using DAL.Repository.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add controller services
builder.Services.AddControllers();

// Add Swagger/OpenAPI services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add authorization services
builder.Services.AddAuthorization();
builder.Services.AddAuthentication().AddCookie(IdentityConstants.ApplicationScheme);

// Add Identity services
builder.Services.AddIdentityCore<User>().AddEntityFrameworkStores<FishFarmsDbContext>()
    .AddApiEndpoints();

// Add AutoMapper services
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Configure and add DbContext services
builder.Services.AddDbContext<FishFarmsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), x => x.MigrationsAssembly("DAL")));

// Add scoped services for dependency injection
builder.Services.AddScoped<IFishFarmsRepository, FishFarmsRepository>();
builder.Services.AddScoped<IFishFarmsService, FishFarmsService>();
builder.Services.AddScoped<IWorkersRepository, WorkersRepository>();
builder.Services.AddScoped<IWorkersService, WorkersService>();

// Configure CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

var app = builder.Build();

// Enable Swagger in development environment
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Enable CORS with the specified policy
app.UseCors("AllowSpecificOrigin");

// Enable authorization
app.UseAuthorization();

// Map controller routes
app.MapControllers();
app.MapIdentityApi<User>();

// Run the application
app.Run();
