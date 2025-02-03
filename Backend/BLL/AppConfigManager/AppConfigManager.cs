using System.Text;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Extensions.Configuration;

namespace BLL.AppConfigManager
{
    public class AppConfigManager : IAppConfigManager
    {
        private readonly IConfiguration _configuration;
        private readonly SecretClient? _secretClient;
        private readonly bool _isDevelopment;

        public AppConfigManager(IConfiguration configuration, bool isDevelopment)
        {
            _configuration = configuration;
            _isDevelopment = isDevelopment;

            if (!_isDevelopment)
            {
                var keyVaultUri = _configuration["KeyVault:Uri"];
                if (!string.IsNullOrEmpty(keyVaultUri))
                {
                    _secretClient = new SecretClient(new Uri(keyVaultUri), new DefaultAzureCredential());
                }
            }
        }

        public void ValidateConfiguration()
        {
            var errorMessage = new StringBuilder();

            try { GetDatabaseConnectionString(); }
            catch (Exception ex) { errorMessage.AppendLine($"Database Connection String: {ex.Message}"); }

            try { GetJwtKey(); }
            catch (Exception ex) { errorMessage.AppendLine($"JWT Key: {ex.Message}"); }

            try { GetJwtIssuer(); }
            catch (Exception ex) { errorMessage.AppendLine($"JWT Issuer: {ex.Message}"); }

            try { GetJwtAudience(); }
            catch (Exception ex) { errorMessage.AppendLine($"JWT Audience: {ex.Message}"); }

            try { GetJwtExpiryTime(); }
            catch (Exception ex) { errorMessage.AppendLine($"JWT Expiry Time: {ex.Message}"); }

            try { GetBlobStorageConnectionString(); }
            catch (Exception ex) { errorMessage.AppendLine($"Blob Storage Connection String: {ex.Message}"); }

            try { GetFishFarmContainerName(); }
            catch (Exception ex) { errorMessage.AppendLine($"Fish Farm Container Name: {ex.Message}"); }

            try { GetEmployeeContainerName(); }
            catch (Exception ex) { errorMessage.AppendLine($"Employee Container Name: {ex.Message}"); }

            try { GetFailedLoginAttempts(); }
            catch (Exception ex) { errorMessage.AppendLine($"Failed Login Attempts: {ex.Message}"); }

            try { GetLockoutTime(); }
            catch (Exception ex) { errorMessage.AppendLine($"Lockout Time: {ex.Message}"); }

            if (errorMessage.Length > 0)
            {
                var finalMessage = errorMessage.ToString();
                Console.WriteLine(finalMessage);
                throw new InvalidOperationException(finalMessage);
            }
        }

        public string GetDatabaseConnectionString()
        {
            if (_isDevelopment)
            {
                return _configuration.GetConnectionString("LocalConnection") ?? throw new InvalidOperationException("Database connection string is not configured.");
            }
            else if (_secretClient != null)
            {
                var secret = _secretClient.GetSecret("DatabaseConnectionString");
                return secret.Value.Value;
            }
            else
            {
                throw new InvalidOperationException("Secret client is not initialized.");
            }
        }

        public string GetJwtKey()
        {
            if (_isDevelopment)
            {
                return _configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT key not found.");
            }
            else if (_secretClient != null)
            {
                var secret = _secretClient.GetSecret("JwtKey");
                return secret.Value.Value;
            }
            else
            {
                throw new InvalidOperationException("Secret client is not initialized.");
            }
        }

        public string GetJwtIssuer()
        {
            return _configuration["Jwt:Issuer"] ?? throw new InvalidOperationException("JWT issuer not found.");
        }

        public string GetJwtAudience()
        {
            return _configuration["Jwt:Audience"] ?? throw new InvalidOperationException("JWT audience not found.");
        }

        public string GetJwtExpiryTime()
        {
            return _configuration["Jwt:ExpTime"] ?? throw new InvalidOperationException("JWT expiry time not found.");
        }

        public string GetBlobStorageConnectionString()
        {
            if (_isDevelopment)
            {
                return _configuration.GetConnectionString("StorageConnection") ?? throw new InvalidOperationException("Blob storage connection string is not configured.");
            }
            else if (_secretClient != null)
            {
                var secret = _secretClient.GetSecret("BlobStorageConnectionString");
                return secret.Value.Value;
            }
            else
            {
                throw new InvalidOperationException("Secret client is not initialized.");
            }
        }

        public string GetFishFarmContainerName()
        {
            return _configuration["Container:FishFarm"] ?? throw new InvalidOperationException("Fish farm images container name not found.");
        }

        public string GetEmployeeContainerName()
        {
            return _configuration["Container:Employees"] ?? throw new InvalidOperationException("Employee images container name not found.");
        }

        public string GetFailedLoginAttempts()
        {
            return _configuration["Login:FailedAttempts"] ?? throw new InvalidOperationException("Failed login attempts not found.");
        }

        public string GetLockoutTime()
        {
            return _configuration["Login:LockoutTimeHours"] ?? throw new InvalidOperationException("Failed login attempts time not found.");
        }

        //public string GetConfigurationValue(string key)
        //{
        //    return _configuration[key];
        //}

        //public async Task<string> GetSecretAsync(string secretName)
        //{
        //    if (_isDevelopment || _secretClient == null)
        //    {
        //        return _configuration[$"Secrets:{secretName}"];
        //    }

        //    KeyVaultSecret secret = await _secretClient.GetSecretAsync(secretName);
        //    return secret.Value;
        //}
    }
}
