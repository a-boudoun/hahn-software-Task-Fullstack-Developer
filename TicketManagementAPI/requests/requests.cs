using TicketManagementAPI.Models;

namespace TicketManagementAPI.Requests{

    public class CreateTicketRequest{

        public string Description;

        public TicketStatus status;
        
    }
}