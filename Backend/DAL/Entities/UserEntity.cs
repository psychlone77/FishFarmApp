namespace DAL.Entities
{
    public class UserEntity : BaseEntity
    {
        public Guid Id { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public DateTime LastLogin { get; set; }
        public int FailedLoginAttempts { get; set; }

        public ICollection<UserSessionEntity>? UserSessions { get; set; }
        public EmployeeEntity? Employee { get; set; }
        public AdminEntity? Admin { get; set; }
    }
}
