using Microsoft.EntityFrameworkCore;
using TicketManagementAPI.Configurations;
using TicketManagementAPI.Models;

namespace TicketManagementAPI.Data
{
    public class TicketsDbContext : DbContext
    {
        public TicketsDbContext(DbContextOptions<TicketsDbContext> options) : base(options) { }

        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TicketConfig());

            base.OnModelCreating(modelBuilder);
        }
    }
}
