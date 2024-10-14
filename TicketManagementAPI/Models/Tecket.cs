namespace TicketManagementAPI.Models
{
    public class Ticket
    {
        public Guid TicketId { get; set; }
        public string Description { get; set; }
        public TicketStatus Status { get; set; } //TODO: force this to be an enum in the database
        public DateTime Date { get; set; }
    }

    public enum TicketStatus{
        OPEN,
        CLOSED
    }
}


