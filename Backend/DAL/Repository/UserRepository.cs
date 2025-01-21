using DAL.Data;
using DAL.Entities;
using DAL.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repository
{
    public class UserRepository(FishFarmAppDbContext fishFarmAppDbContext) : IUserRepository
    {
        private readonly FishFarmAppDbContext _fishFarmAppDbContext = fishFarmAppDbContext;
        public async Task<UserEntity> AddUser(UserEntity user)
        {
            var addedUser = _fishFarmAppDbContext.Users.Add(user);
            await _fishFarmAppDbContext.SaveChangesAsync();
            return addedUser.Entity;
        }

        public Task<UserEntity?> DeleteUser(Guid userId)
        {
            throw new NotImplementedException();
        }

        public async Task<UserEntity?> GetUserByEmail(string email)
        {
            return await _fishFarmAppDbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public Task<UserEntity?> GetUserById(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<UserEntity?> GetUserBySessionId(Guid sessionId)
        {
            throw new NotImplementedException();
        }

        public Task<UserEntity?> UpdateUser(UserEntity user)
        {
            throw new NotImplementedException();
        }

        public async Task FailedLoginAttempt(Guid userId)
        {
            var user = await _fishFarmAppDbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                throw new KeyNotFoundException("User not found");
            user.FailedLoginAttempts++;
            user.LastLogin = DateTime.Now;
            await _fishFarmAppDbContext.SaveChangesAsync();
        }

        public async Task SuccessfulLogin(Guid userId)
        {
            var user = await _fishFarmAppDbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                throw new KeyNotFoundException("User not found");
            user.FailedLoginAttempts = 0;
            user.LastLogin = DateTime.Now;
            await _fishFarmAppDbContext.SaveChangesAsync();
        }
    }
}
