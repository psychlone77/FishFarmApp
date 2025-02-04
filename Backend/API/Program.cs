using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using API.Filters;
using BLL.AppConfigManager;
using BLL.Services;
using BLL.Services.Interfaces;
using BLL.Utils;
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

// Add AutoMapper services
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Configuration.AddUserSecrets<Program>();

builder.Services.AddSingleton<IAppConfigManager>(provider =>
{
    var configuration = provider.GetRequiredService<IConfiguration>();
    var isDevelopment = provider.GetRequiredService<IWebHostEnvironment>().IsDevelopment();
    return new AppConfigManager(configuration, isDevelopment);
});

// Configure and add DbContext services
var configManager = new AppConfigManager(builder.Configuration, builder.Environment.IsDevelopment());
configManager.ValidateConfiguration();
builder.Services.AddDbContext<FishFarmAppDbContext>(options =>
    options.UseSqlServer(configManager.GetDatabaseConnectionString(), x => x.MigrationsAssembly("DAL")));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configManager.GetJwtKey())),
            ValidIssuer = configManager.GetJwtIssuer(),
            ValidAudience = configManager.GetJwtAudience()
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
builder.Services.AddSingleton<TokenProvider>();
builder.Services.AddScoped<IFishFarmRepository, FishFarmRepository>();
builder.Services.AddScoped<IFishFarmsService, FishFarmsService>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IBoatService, BoatService>();
builder.Services.AddScoped<IBoatRepository, BoatRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IBlobStorage, AzureBlobStorage>(
   provider => new AzureBlobStorage(configManager.GetBlobStorageConnectionString())
);
builder.Services.AddTransient<Helpers>();

// Configure CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials());
});

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "wwwroot";
});

var app = builder.Build();

// Enable CORS with the specified policy
app.UseCors("AllowSpecificOrigin");

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

// Enable authorization
app.UseAuthorization();

// Map controller routes
app.MapControllers();

app.Use(async (context, next) =>
{
    if (context.Request.Path == "/" && context.Request.Headers.Accept.ToString().Contains("text/html"))
    {
        context.Response.Redirect("/app");
    }
    else
    {
        await next();
    }
});

app.Map(new PathString("/app"), client =>
{
    client.UseSpaStaticFiles();
    client.UseSpa(spa => { });
});

// Run the application
app.Run();
