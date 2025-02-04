using DAL.Data;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class UserSessionRepository(FishFarmAppDbContext context) : IUserSessionRepository
    {
        private readonly FishFarmAppDbContext _context = context;

        public async Task<UserSessionEntity?> GetUserSessionById(Guid sessionId)
        {
            return await _context.UserSessions.FindAsync(sessionId);
        }

        public async Task<UserSessionEntity?> GetUserSessionByRefreshToken(string refreshToken)
        {
            return await _context.UserSessions.FirstOrDefaultAsync(us => us.RefreshToken == refreshToken);
        }

        public async Task<UserSessionEntity?> GetUserSessionByUserId(Guid userId)
        {
            return await _context.UserSessions.FirstOrDefaultAsync(us => us.UserId == userId);
        }
        public async Task<UserSessionEntity> CreateUserSession(UserSessionEntity userSession)
        {
            _context.UserSessions.Add(userSession);
            await _context.SaveChangesAsync();
            return userSession;
        }

        public async Task<UserSessionEntity> UpdateUserSession(UserSessionEntity userSession)
        {
            _context.UserSessions.Update(userSession);
            await _context.SaveChangesAsync();
            return userSession;
        }
        public async Task DeleteUserSession(UserSessionEntity userSession)
        {
            _context.UserSessions.Remove(userSession);
            await _context.SaveChangesAsync();
        }
    }
}
