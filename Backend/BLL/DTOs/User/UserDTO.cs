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
        public required T UserData { get; set; }

    }
}
