using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketManagementAPI.Models;
using TicketManagementAPI.Repositories;

namespace TicketManagementAPI.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;

        public TicketService(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<IEnumerable<Ticket>> GetAllTicketsAsync(int page, int pageSize)
        {
            return await _ticketRepository.GetAllTicketsAsync(page, pageSize);
        }

        public async Task AddTicketAsync(Ticket ticket)
        {
            await _ticketRepository.AddTicketAsync(ticket);
        }

        public async Task UpdateTicketAsync(Ticket ticket)
        {
            await _ticketRepository.UpdateTicketAsync(ticket);
        }

        public async Task DeleteTicketAsync(int ticketId)
        {
            await _ticketRepository.DeleteTicketAsync(ticketId);
        }

        public async Task<int> GetTotalCountAsync()
        {
            return await _ticketRepository.GetTotalCountAsync();
        }
    }
}
