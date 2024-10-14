using Microsoft.EntityFrameworkCore;
using TicketManagementAPI.Models;

namespace TicketManagementAPI.Data
{
    public class TicketsDbContext : DbContext
    {
        public TicketsDbContext(DbContextOptions<TicketsDbContext> options) : base(options) { }

        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure TicketStatus to be stored as a string
            modelBuilder.Entity<Ticket>()
                .Property(t => t.Status)
                .HasConversion<string>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
