namespace BLL.DTOs.User
{
    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class  LoginSuccess<T>
    {
        public required string Token { get; set; }
        public required string RefreshToken { get; set; }
        public required string Email { get; set; }
        public required string Role { get; set; }
        public required T UserData { get; set; }
    }

    public class UserResponse<T>
    {
        public required string Role { get; set; }
        public required string Email { get; set; }
        public required T User { get; set; }
    }

    public class TokenResponse
    {
        public required string AccessToken { get; set; }
        public required string RefreshToken { get; set; }
    }

    public class RefreshTokenRequest
    {
        public required string RefreshToken { get; set; }
    }

    public class UpdateEmailRequest
    {
        public required string Email { get; set; }
    }

    public class UpdatePasswordRequest
    {
        public required string OldPassword { get; set; }
        public required string NewPassword { get; set; }
    }
}
