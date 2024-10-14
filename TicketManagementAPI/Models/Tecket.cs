namespace TicketManagementAPI.Models
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public string Description { get; set; }
        //TODO: make this an enum
        public string Status { get; set; } // "Open" or "Closed"
        public DateTime Date { get; set; }
    }
}
