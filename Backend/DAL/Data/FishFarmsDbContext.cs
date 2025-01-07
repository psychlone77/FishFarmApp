using DAL.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data
{
    public class FishFarmsDbContext(DbContextOptions<FishFarmsDbContext> options) : IdentityDbContext<User>(options)
    {
        public DbSet<FishFarmEntity> FishFarms { get; set; }
        public DbSet<WorkerEntity> Workers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var createdOnProperty = entityType.FindProperty("CreatedOn");
                if (createdOnProperty != null && createdOnProperty.ClrType == typeof(DateTime))
                {
                    createdOnProperty.SetDefaultValueSql("GETUTCDATE()");
                }
                var updatedOnProperty = entityType.FindProperty("UpdatedOn");
                if (updatedOnProperty != null && updatedOnProperty.ClrType == typeof(DateTime))
                {
                    updatedOnProperty.SetDefaultValueSql("GETUTCDATE()");
                }
            }

            modelBuilder.Entity<FishFarmEntity>()
                .HasMany(f => f.Workers)
                .WithOne(w => w.FishFarm)
                .HasForeignKey(w => w.FishFarmId);

            modelBuilder.Entity<FishFarmEntity>()
                .HasOne(f => f.User)
                .WithMany(u => u.FishFarms)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
