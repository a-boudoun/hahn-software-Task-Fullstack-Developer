using TicketManagementAPI.Models;
using System;
using System.Collections.Generic;

namespace TicketManagementAPI.Responses{

    public class GetTicketResponse {
        public int TicketId {get; set;}
        public string Description {get; set;}
        public TicketStatus Status {get; set;}
        public DateTime Date {get; set;}
    }

    public class GetTicketsPagedResponse {
        public int TotalCount {get; set;}
        public int PageSize {get; set;}
        public int CurrentPage {get; set;}
        public int TotalPages {get; set;}
        
        public IEnumerable<GetTicketResponse> Tickets { get; set; } // Correct type

    }
}