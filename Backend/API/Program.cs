using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using API.Filters;
using Azure.Core;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using BLL.Services;
using BLL.Services.Interfaces;
using BlobStorage;
using BlobStorage.Interfaces;
using DAL.Data;
using DAL.Repository;
using DAL.Repository.Interface;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add controller services
builder.Services.AddControllers(options =>
{
    options.Filters.Add<ExceptionFilter>();
}).AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});


// Add Swagger/OpenAPI services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add authorization services
//builder.Services.AddAuthorization();
//builder.Services.AddAuthentication().AddCookie(IdentityConstants.ApplicationScheme, options =>
//{
//    options.Cookie.SameSite = builder.Environment.IsDevelopment() ? SameSiteMode.None : SameSiteMode.Lax; // Set SameSite to None
//    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Ensure the cookie is only sent over HTTPS
//});

//// Add Identity services
//builder.Services.AddIdentityCore<UserEntity>().AddEntityFrameworkStores<FishFarmAppDbContext>()
//    .AddApiEndpoints();

// Add AutoMapper services
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Configuration.AddUserSecrets<Program>();
string secretValue;
string jwtKey = "";

if (builder.Environment.IsDevelopment())
{
    secretValue = builder.Configuration.GetConnectionString("LocalConnection") ?? throw new InvalidOperationException("Connection string 'DatabaseConnectionString' not found.");
    jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT key not found.");
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
    KeyVaultSecret jwtSecret = client.GetSecret("JwtKey");
    secretValue = secret.Value ?? throw new InvalidOperationException("Secret 'DatabaseConnectionString' not found in Key Vault.");
    jwtKey = jwtSecret.Value ?? throw new InvalidOperationException("Secret 'JwtKey' not found in Key Vault.");
}

// Configure and add DbContext services
builder.Services.AddDbContext<FishFarmAppDbContext>(options =>
    options.UseSqlServer(secretValue, x => x.MigrationsAssembly("DAL")));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"]
        };

        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";
                var result = JsonSerializer.Serialize(new { message = "Authentication failed." });
                return context.Response.WriteAsync(result);
            },
            OnForbidden = context =>
            {
                context.Response.StatusCode = 403;
                context.Response.ContentType = "application/json";
                var result = JsonSerializer.Serialize(new { message = "You are not authorized to perform this action" });
                return context.Response.WriteAsync(result);

            }
        };
    });

// Add scoped services for dependency injection
builder.Services.AddSingleton(new TokenProvider(builder.Configuration));
builder.Services.AddScoped<IFishFarmRepository, FishFarmRepository>();
builder.Services.AddScoped<IFishFarmsService, FishFarmsService>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IBoatService, BoatService>();
builder.Services.AddScoped<IBoatRepository, BoatRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IBlobStorage, AzureBlobStorage>();

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
    var dbContext = scope.ServiceProvider.GetRequiredService<FishFarmAppDbContext>();
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
//app.MapIdentityApi<UserEntity>().RequireAuthorization().WithMetadata(new AllowAnonymousAttribute());
//app.MapFallbackToFile("index.html");

//app.UseStaticFiles();

// Run the application
app.Run();
