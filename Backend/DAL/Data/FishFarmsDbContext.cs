using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data
{
    public class FishFarmsDbContext : DbContext
    {
        public FishFarmsDbContext(DbContextOptions<FishFarmsDbContext> options) : base(options)
        {
        }

        public DbSet<FishFarmEntity> FishFarms { get; set; }
        public DbSet<WorkerEntity> Workers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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
        }
    }
}
