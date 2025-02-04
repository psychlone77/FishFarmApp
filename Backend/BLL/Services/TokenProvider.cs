using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BLL.AppConfigManager;
using DAL.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BLL.Services
{
    public class TokenProvider(IAppConfigManager configManager)
    {
        private readonly IAppConfigManager _configManager = configManager;

        public string CreateToken(UserEntity user)
        {
            var claims = new List<Claim>
                        {
                            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                            new Claim(ClaimTypes.Email, user.Email),
                            new Claim(ClaimTypes.Role, user.Role.ToString())
                        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configManager.GetJwtKey()));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                _configManager.GetJwtIssuer(),
                _configManager.GetJwtAudience(),
                claims,
                expires: DateTime.Now.AddMinutes(double.Parse(_configManager.GetJwtExpiryTime())),
                //expires: DateTime.Now.AddSeconds(10),
                signingCredentials: creds
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(tokenDescriptor);
        }

        public (string, int) CreateRefreshToken()
        {
            var randomNumber = new byte[32];
            var expTime = int.Parse(_configManager.GetRefreshTokenExpiryTime());
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return (Convert.ToBase64String(randomNumber), expTime);
            }
        }
    }
}
