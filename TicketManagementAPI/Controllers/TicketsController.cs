using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketManagementAPI.Data;
using TicketManagementAPI.Models;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly TicketsDbContext _context;

    public TicketsController(TicketsDbContext context)
    {
        _context = context;
    }

    // GET: api/Tickets
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets(int page = 1, int pageSize = 10)
    {
        return await _context.Tickets
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    // GET: api/Tickets/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Ticket>> GetTicket(int id)
    {
        var ticket = await _context.Tickets.FindAsync(id);

        if (ticket == null)
        {
            return NotFound();
        }

        return ticket;
    }

    // POST: api/Tickets
    [HttpPost]
    public async Task<ActionResult<Ticket>> CreateTicket(Ticket ticket)
    {
        ticket.Date = DateTime.UtcNow;
        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTicket), new { id = ticket.TicketId }, ticket);
    }

//TODO: create a request dto and a response dto for every endpoint or add a global one
    // PUT: api/Tickets/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTicket(Guid id, Ticket ticket)
    {
        if (id != ticket.TicketId)
        {
            return BadRequest();
        }

        _context.Entry(ticket).State = EntityState.Modified;

        try
        {
            // TODO create a repository and add these functions to it
            //TODO create a service and add the logic to it
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TicketExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Tickets/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTicket(Guid id)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }

        _context.Tickets.Remove(ticket);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TicketExists(Guid id)
    {
        return _context.Tickets.Any(e => e.TicketId == id);
    }
}
