using TicketManagementAPI.Models;

namespace TicketManagementAPI.Requests{

    public class CreateOrUpdateTicketRequest{

        public string Description {get; set;}

        public TicketStatus Status {get; set;}

    }
}