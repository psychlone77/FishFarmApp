using DAL.Entities;

namespace DAL.Repository.Interface
{
    public interface IUserRepository
    {
        Task<UserEntity?> GetUserById(Guid userId);
        Task<UserEntity?> GetUserByEmployeeId(string employeeId);
        Task<UserEntity?> GetUserByEmail(string email);
        Task<UserEntity?> GetUserBySessionId(Guid sessionId);
        Task<UserEntity> AddUser(UserEntity user);
        Task<UserEntity?> UpdateUser(UserEntity user);
        Task<UserEntity?> DeleteUser(Guid userId);
        Task FailedLoginAttempt(Guid userId);
        Task SuccessfulLogin(Guid userId);
    }
}
