using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data
{
    public class FishFarmAppDbContext(DbContextOptions<FishFarmAppDbContext> options) : DbContext(options)
    {
        public DbSet<FishFarmEntity> FishFarms { get; set; }
        public DbSet<EmployeeEntity> Employees { get; set; }
        public DbSet<BoatEntity> Boats { get; set; }
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<UserSessionEntity> UserSessions { get; set; }

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
                var isDeletedProperty = entityType.FindProperty("IsDeleted");
                if (isDeletedProperty != null && isDeletedProperty.ClrType == typeof(bool))
                {
                    isDeletedProperty.SetDefaultValue(false);
                }
            }

            modelBuilder.Entity<UserEntity>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<UserEntity>()
                .HasMany(u => u.UserSessions)
                .WithOne(us => us.User)
                .HasForeignKey(us => us.UserId);

            modelBuilder.Entity<UserEntity>()
                .HasOne(e => e.Employee)
                .WithOne(u => u.User)
                .HasForeignKey<UserEntity>(e => e.EmployeeId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserEntity>().HasQueryFilter(u => u.IsDeleted == false);

            modelBuilder.Entity<FishFarmEntity>()
                .HasMany(f => f.Users)
                .WithMany(e => e.FishFarms)
                .UsingEntity<FishFarmUser>(
                    j => j.HasOne(fe => fe.User)
                        .WithMany(e => e.FishFarmUsers)
                        .HasForeignKey(fe => fe.UserId),
                    j => j.HasOne(fe => fe.FishFarm)
                        .WithMany(f => f.FishFarmUsers)
                        .HasForeignKey(fe => fe.FishFarmId)
                );

            modelBuilder.Entity<FishFarmEntity>()
                .HasMany(f => f.Boats)
                .WithOne(f => f.FishFarm)
                .HasForeignKey(f => f.FishFarmId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FishFarmEntity>().HasQueryFilter(f => f.IsDeleted == false);

            modelBuilder.Entity<BoatEntity>().HasQueryFilter(b => b.IsDeleted == false);
        }
    }
}
