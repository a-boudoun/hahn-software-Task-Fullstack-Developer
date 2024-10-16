using TicketManagementAPI.Models;
using TicketManagementAPI.Responses;

namespace TicketManagementAPI.Services
{
    public interface ITicketService
    {
        Task<GetTicketsPagedResponse> GetAllTicketsAsync(int page, int pageSize, string? status);
        Task<GetTicketResponse> AddTicketAsync(Ticket ticket);
        Task UpdateTicketAsync(int id, string description, TicketStatus status);
        Task DeleteTicketAsync(int ticketId);
        Task<int> GetTotalCountAsync();
    }
}
