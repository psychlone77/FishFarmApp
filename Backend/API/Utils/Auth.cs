using System.Security.Claims;

namespace API.Utils
{
    public static class Auth
    {
        public static (string userId, string userRole) GetClaims(ClaimsPrincipal User)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRoleClaim = User.FindFirstValue(ClaimTypes.Role);
            if (userIdClaim == null || userRoleClaim == null)
            {
                throw new ArgumentNullException("User ID claim not found.");
            }
            return (userIdClaim, userRoleClaim);
        }
    }
}
