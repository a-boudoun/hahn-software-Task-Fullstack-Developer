using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TicketManagementAPI.Data;
using TicketManagementAPI.Models;

namespace TicketManagementAPI.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly TicketsDbContext _context;

        public TicketRepository(TicketsDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Ticket>> GetAllTicketsAsync(int page, int pageSize, string? status)
        {
            var query =  _context.Tickets
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            if (status != null)
            {
                if (Enum.TryParse<TicketStatus>(status, true, out var ticketStatus))
                {
                    query = query.Where(t => t.Status == ticketStatus);
                }
            }
            return await query.ToListAsync();
        }

        public async Task<Ticket> GetTicketByIdAsync(int ticketId)
        {
            return await _context.Tickets.FindAsync(ticketId);
        }

        public async Task AddTicketAsync(Ticket ticket)
        {
            await _context.Tickets.AddAsync(ticket);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTicketAsync(Ticket ticket)
        {
            _context.Tickets.Update(ticket);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTicketAsync(int ticketId)
        {
            var ticket = await GetTicketByIdAsync(ticketId);
            if (ticket != null)
            {
                _context.Tickets.Remove(ticket);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<int> GetTotalCountAsync()
        {
            return await _context.Tickets.CountAsync();
        }
    }
}
