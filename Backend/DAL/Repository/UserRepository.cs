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

        public async Task<UserEntity?> DeleteUser(Guid userId)
        {
            var user = _fishFarmAppDbContext.Users.Find(userId);
            if (user == null)
                return null;
            _fishFarmAppDbContext.Users.Remove(user);
            await _fishFarmAppDbContext.SaveChangesAsync();
            return user;
        }

        public async Task<UserEntity?> GetUserByEmail(string email)
        {
            return await _fishFarmAppDbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public Task<UserEntity?> GetUserById(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<UserEntity?> GetUserByEmployeeId(string employeeId)
        {
            return _fishFarmAppDbContext.Users.FirstOrDefaultAsync(u => u.EmployeeId == employeeId);
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

        public async Task<FishFarmUser?> GetFishFarmUser(Guid fishFarmId, Guid userId)
        {
            var fishFarmUser = await _fishFarmAppDbContext.FishFarmUser.FirstOrDefaultAsync(fu => fu.FishFarmId == fishFarmId && fu.UserId == userId);
            return fishFarmUser;
        }

        public async Task<FishFarmUser> AddUserToFishFarm(Guid fishFarmId, Guid userId, int permissionLevel)
        {
            var fishFarm = await _fishFarmAppDbContext.FishFarms.FindAsync(fishFarmId);
            var user = await _fishFarmAppDbContext.Users.FindAsync(userId);
            if (fishFarm == null || user == null)
                throw new ArgumentException("Invalid FishFarmId or UserId");

            var fishFarmUser = new FishFarmUser
            {
                FishFarmId = fishFarmId,
                UserId = userId,
                PermissionLevel = permissionLevel,
                AssignedDate = DateTime.UtcNow,
                FishFarm = fishFarm,
                User = user
            };
            await _fishFarmAppDbContext.FishFarmUser.AddAsync(fishFarmUser);
            await _fishFarmAppDbContext.SaveChangesAsync();
            return fishFarmUser;
        }

        public async Task<FishFarmUser?> RemoveUserFromFishFarm(Guid fishFarmId, Guid userId)
        {
            var fishFarmUser = await _fishFarmAppDbContext.FishFarmUser.FirstOrDefaultAsync(fu => fu.FishFarmId == fishFarmId && fu.UserId == userId);
            if (fishFarmUser == null)
                return null;
            _fishFarmAppDbContext.FishFarmUser.Remove(fishFarmUser);
            await _fishFarmAppDbContext.SaveChangesAsync();
            return fishFarmUser;
        }

        public async Task<IList<FishFarmUser>> GetFishFarmsByUser(Guid userId)
        {
            return await _fishFarmAppDbContext.FishFarmUser.Where(fu => fu.UserId == userId).ToListAsync();
        }
    }
}
