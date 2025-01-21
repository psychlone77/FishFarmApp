using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DAL.Entities
{
    public class UserEntity : BaseEntity
    {
        public Guid Id { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public UserRole Role { get; set; }
        public DateTime LastLogin { get; set; }
        public int FailedLoginAttempts { get; set; }

        public required string EmployeeId { get; set; }
        public required EmployeeEntity Employee { get; set; }
        public ICollection<UserSessionEntity>? UserSessions { get; set; }
        public ICollection<FishFarmEntity>? FishFarms { get; set; }
        public ICollection<FishFarmUser>? FishFarmUsers { get; set; }
    }

    public enum UserRole
    {
        [Display(Name = "SuperAdmin")]
        SuperAdmin,
        [Display(Name = "Admin")]
        Admin,
        [Display(Name = "Employee")]
        Employee
    }
}
