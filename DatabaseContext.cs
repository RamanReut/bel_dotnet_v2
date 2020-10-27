using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using Models.Database;

namespace Database
{
    public partial class DatabaseContext : DbContext
    {
        private readonly IConfiguration Configuration;

        public DatabaseContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public DatabaseContext(
            DbContextOptions<DatabaseContext> options,
            IConfiguration configuration) : base(options)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql(
                    Configuration["ConnectionString.MySql"],
                    x => x.ServerVersion("8.0.21-mysql"));
            }
        }

        public DbSet<RuData> RuData { get; set; }

        public DbSet<BeData> BeData { get; set; }

        public DbSet<LocaleData> LocaleData { get; set; }

        public DbSet<News> News { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        public override int SaveChanges()
        {
            SetCreatedAndUpdateDate();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            SetCreatedAndUpdateDate();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(
            bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = default)
        {
            SetCreatedAndUpdateDate();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        public override Task<int> SaveChangesAsync(
            CancellationToken cancellationToken = default)
        {
            SetCreatedAndUpdateDate();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void SetCreatedAndUpdateDate()
        {
            SetCreatedDate();
            SetUpdatedDate();
        }

        private IEnumerable<EntityEntry<DatabaseEntity>> GetAdded()
        {
            return GetEntitiesByFilter(e => e.State == EntityState.Added);
        }

        private IEnumerable<EntityEntry<DatabaseEntity>> GetUpdated()
        {
            return GetEntitiesByFilter(e => e.State == EntityState.Modified);
        }

        private IEnumerable<EntityEntry<DatabaseEntity>> GetEntitiesByFilter(
            System.Func<EntityEntry<DatabaseEntity>, bool> filter
        )
        {
            return ChangeTracker.Entries<DatabaseEntity>().Where(filter);
        }

        private void SetCreatedDate()
        {
            foreach (var entry in GetAdded())
            {
                entry.Entity.CreatedDate = DateTime.Now;
            }
        }

        private void SetUpdatedDate()
        {
            foreach (var entry in GetUpdated())
            {
                entry.Entity.UpdatedDate = DateTime.Now;
            }
        }
    }
}
