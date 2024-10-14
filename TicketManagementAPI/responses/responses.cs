using TicketManagementAPI.Models;

namespace TicketManagementAPI.responses{

    public class getTicketResponse{
        public Guid TicketId;
        public string Description;
        public TicketStatus status;
        public DateTime date;
    }
}