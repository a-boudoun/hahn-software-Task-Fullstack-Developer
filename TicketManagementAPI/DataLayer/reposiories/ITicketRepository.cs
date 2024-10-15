using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketManagementAPI.Models;

namespace TicketManagementAPI.Repositories
{
    public interface ITicketRepository
    {
        Task<IEnumerable<Ticket>> GetAllTicketsAsync(int page, int pageSize);
        Task<Ticket> GetTicketByIdAsync(int ticketId);
        Task AddTicketAsync(Ticket ticket);
        Task UpdateTicketAsync(Ticket ticket);
        Task DeleteTicketAsync(int ticketId);
        Task<int> GetTotalCountAsync();
    }
}
