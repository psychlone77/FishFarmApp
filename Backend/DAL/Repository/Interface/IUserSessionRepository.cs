using DAL.Entities;

namespace DAL.Repository.Interface
{
    public interface IUserSessionRepository
    {
        Task<UserSessionEntity?> GetUserSessionById(Guid sessionId);
        Task<UserSessionEntity?> GetUserSessionByUserId(Guid userId);
        Task<UserSessionEntity?> GetUserSessionByRefreshToken(string refreshToken);
        Task<UserSessionEntity> CreateUserSession(UserSessionEntity userSession);
        Task<UserSessionEntity> UpdateUserSession(UserSessionEntity userSession);
        Task DeleteUserSession(UserSessionEntity userSession);
    }
}
