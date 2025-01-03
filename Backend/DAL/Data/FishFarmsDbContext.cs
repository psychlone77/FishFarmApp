using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data
{
    public class FishFarmsDbContext(DbContextOptions<FishFarmsDbContext> options) : DbContext(options)
    {
        public DbSet<FishFarmEntity> FishFarms { get; set; }
        public DbSet<WorkerEntity> Workers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FishFarmEntity>()
                .HasMany(f => f.Workers)
                .WithOne(w => w.FishFarm)
                .HasForeignKey(w => w.FishFarmId);
            modelBuilder.Entity<FishFarmEntity>().HasData(
                new FishFarmEntity
                {
                    Id = 1,
                    Name = "Fishy Business",
                    Latitude = 56.1234,
                    Longitude = 12.1234,
                    CageCount = 10,
                    HasBarge = true,
                    ImageURL = new Uri("https://fishybusiness.com"),
                },
                new FishFarmEntity
                {
                    Id = 2,
                    Name = "Fishy Business 2",
                    Latitude = 56.1234,
                    Longitude = 12.1234,
                    CageCount = 10,
                    HasBarge = true,
                    ImageURL = new Uri("https://fishybusiness2.com"),
                }
            );
        }
    }
}
