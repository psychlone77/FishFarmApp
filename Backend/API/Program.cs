// Import necessary namespaces
using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using BLL.Services;
using BLL.Services.Interfaces;
using DAL.Data;
using DAL.Entities;
using DAL.Repository;
using DAL.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
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
builder.Services.AddAuthentication().AddCookie(IdentityConstants.ApplicationScheme, options =>
{
    options.Cookie.SameSite = builder.Environment.IsDevelopment() ? SameSiteMode.None : SameSiteMode.Lax; // Set SameSite to None
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Ensure the cookie is only sent over HTTPS
});

// Add Identity services
builder.Services.AddIdentityCore<User>().AddEntityFrameworkStores<FishFarmsDbContext>()
    .AddApiEndpoints();

// Add AutoMapper services
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

string secretValue;

if (builder.Environment.IsDevelopment())
{
    secretValue = builder.Configuration.GetConnectionString("LocalConnection") ?? throw new InvalidOperationException("Connection string 'DatabaseConnectionString' not found.");
}
else
{
    SecretClientOptions options = new SecretClientOptions()
    {
        Retry =
        {
            Delay= TimeSpan.FromSeconds(2),
            MaxDelay = TimeSpan.FromSeconds(16),
            MaxRetries = 5,
            Mode = RetryMode.Exponential
         }
    };
    var client = new SecretClient(new Uri("https://fish-farm-vault.vault.azure.net/"), new DefaultAzureCredential(), options);
    KeyVaultSecret secret = client.GetSecret("DatabaseConnectionString");
    secretValue = secret.Value ?? throw new InvalidOperationException("Secret 'DatabaseConnectionString' not found in Key Vault.");
}

// Configure and add DbContext services
builder.Services.AddDbContext<FishFarmsDbContext>(options =>
    options.UseSqlServer(secretValue, x => x.MigrationsAssembly("DAL")));

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
                          .AllowAnyMethod()
                          .AllowCredentials());
});

var app = builder.Build();

// Apply migrations automatically
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<FishFarmsDbContext>();
    dbContext.Database.Migrate();
}

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
app.MapIdentityApi<User>().RequireAuthorization().WithMetadata(new AllowAnonymousAttribute());
app.MapFallbackToFile("index.html");

app.UseStaticFiles();

// Run the application
app.Run();
