namespace TicketManagementAPI.Models
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public string Description { get; set; }
        public TicketStatus Status { get; set; }
        public DateTime Date { get; set; }
    }

    public enum TicketStatus{
        OPEN,
        CLOSED
    }
}


