using DAL.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data
{
    public class FishFarmAppDbContext(DbContextOptions<FishFarmAppDbContext> options) : DbContext(options)
    {
        public DbSet<FishFarmEntity> FishFarms { get; set; }
        public DbSet<EmployeeEntity> Employees { get; set; }
        public DbSet<BoatEntity> Boats { get; set; }
        public DbSet<AdminEntity> Admins { get; set; }
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
            }

            //modelBuilder.Entity<FishFarmEntity>()
            //    .HasMany(f => f.Workers)
            //    .WithOne(w => w.FishFarm)
            //    .OnDelete(DeleteBehavior.Restrict)
            //    .HasForeignKey(w => w.FishFarmId);

            //modelBuilder.Entity<FishFarmEntity>()
            //    .HasOne(f => f.User)
            //    .WithMany(u => u.FishFarms)
            //    .HasForeignKey(f => f.UserId)
            //    .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserEntity>()
                .HasMany(u => u.UserSessions)
                .WithOne(us => us.User)
                .HasForeignKey(us => us.UserId);

            modelBuilder.Entity<AdminEntity>()
                .HasOne(u => u.User)
                .WithOne(a => a.Admin)
                .HasForeignKey<AdminEntity>(a => a.UserId);

            modelBuilder.Entity<EmployeeEntity>()
                .HasOne(e => e.User)
                .WithOne(u => u.Employee)
                .HasForeignKey<EmployeeEntity>(e => e.UserId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FishFarmEntity>()
                .HasMany(f => f.Admins)
                .WithMany(a => a.FishFarms)
                .UsingEntity<AdminFishFarm>(
                    j => j.HasOne(af => af.Admin)
                        .WithMany(a => a.AdminFishFarms)
                        .HasForeignKey(af => af.AdminId),
                    j => j.HasOne(af => af.FishFarm)
                        .WithMany(f => f.AdminFishFarms)
                        .HasForeignKey(af => af.FishFarmId)
                );

            modelBuilder.Entity<FishFarmEntity>()
                .HasMany(f => f.Employees)
                .WithMany(e => e.FishFarms)
                .UsingEntity<FishFarmEmployee>(
                    j => j.HasOne(fe => fe.Employee)
                        .WithMany(e => e.FishFarmEmployees)
                        .HasForeignKey(fe => fe.EmployeeId),
                    j => j.HasOne(fe => fe.FishFarm)
                        .WithMany(f => f.FishFarmEmployees)
                        .HasForeignKey(fe => fe.FishFarmId)
                );

            modelBuilder.Entity<FishFarmEntity>()
                .HasMany(f => f.Boats)
                .WithOne(f => f.FishFarm)
                .HasForeignKey(f => f.FishFarmId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
