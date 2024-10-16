using TicketManagementAPI.Models;
using TicketManagementAPI.Repositories;
using TicketManagementAPI.Responses;

namespace TicketManagementAPI.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _ticketRepository;

        public TicketService(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<GetTicketsPagedResponse> GetAllTicketsAsync(int page, int pageSize, string? status)
        {
            var totalCount = await GetTotalCountAsync();
            var tickets = await _ticketRepository.GetAllTicketsAsync(page, pageSize, status);
            var result = new GetTicketsPagedResponse
            {
                TotalCount = totalCount,
                PageSize = pageSize,
                CurrentPage = page,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Tickets = tickets.Select(t => new GetTicketResponse
                {
                    TicketId = t.TicketId,
                    Description = t.Description,
                    Status = t.Status,
                    Date = t.Date
                })
            };
            return result;
        }

        public async Task<GetTicketResponse> AddTicketAsync(Ticket ticket)
        {
            await _ticketRepository.AddTicketAsync(ticket);
            
            var response = new GetTicketResponse
            {
                TicketId = ticket.TicketId,
                Description = ticket.Description,
                Status = ticket.Status,
                Date = ticket.Date
            };

            return response;
        }

        public async Task UpdateTicketAsync(int id, string description, TicketStatus status)
        {
            var ticket = await _ticketRepository.GetTicketByIdAsync(id);
            if (ticket != null)
            {
                ticket.Description = description;
                ticket.Status = status;
                await _ticketRepository.UpdateTicketAsync(ticket);
            }
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
