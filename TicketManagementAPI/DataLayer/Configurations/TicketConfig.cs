using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TicketManagementAPI.Models;

namespace TicketManagementAPI.Configurations
{
    internal class TicketConfig : IEntityTypeConfiguration<Ticket>
    {
        public void Configure(EntityTypeBuilder<Ticket> builder)
        {
            builder.HasKey(t => t.TicketId);
            builder.Property(t => t.TicketId).ValueGeneratedOnAdd();

            builder.Property(t => t.Status)
                .HasConversion(
                    value => value.ToString(),
                    convertedValue => Enum.Parse<TicketStatus>(convertedValue));

        }
    }
}
