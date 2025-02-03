﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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
                expires: DateTime.Now.AddHours(double.Parse(_configManager.GetJwtExpiryTime())),
                signingCredentials: creds
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(tokenDescriptor);
        }
    }
}
