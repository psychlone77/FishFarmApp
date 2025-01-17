namespace DAL.Entities
{
    public class UserSessionEntity
    {
        public Guid Id { get; set; }
        public required string RefreshToken { get; set; }
        public DateTime ExpirationDate { get; set; }
        public Guid UserId { get; set; }
        public required UserEntity User { get; set; }
    }
}
