using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketManagementAPI.Models;

namespace TicketManagementAPI.Services
{
    public interface ITicketService
    {
        Task<IEnumerable<Ticket>> GetAllTicketsAsync(int page, int pageSize);
        Task AddTicketAsync(Ticket ticket);
        Task UpdateTicketAsync(Ticket ticket);
        Task DeleteTicketAsync(int ticketId);
        Task<int> GetTotalCountAsync();
    }
}
