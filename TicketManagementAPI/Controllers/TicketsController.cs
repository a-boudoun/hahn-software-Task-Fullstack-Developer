using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketManagementAPI.Models;
using TicketManagementAPI.Services;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public TicketsController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    // GET: api/Tickets
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets(int page = 1, int pageSize = 10)
    {
        var tickets = await _ticketService.GetAllTicketsAsync(page, pageSize);
        var totalCount = await _ticketService.GetTotalCountAsync();

        return Ok(new
        {
            TotalCount = totalCount,
            PageSize = pageSize,
            CurrentPage = page,
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
            Tickets = tickets
        });
    }

   //TODO: add an endpoint for sorting
   //TODO: add an endpoint for filltering by status.

    // POST: api/Tickets
    [HttpPost]
    public async Task<ActionResult<Ticket>> CreateTicket([FromBody] Ticket ticket)
    {
        if (ticket == null)
        {
            return BadRequest("Ticket data is missing.");
        }

        // Proceed with saving the ticket to the database
        await _ticketService.AddTicketAsync(ticket);
        return Ok("created");
    }


    // PUT: api/Tickets/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTicket(int id, Ticket ticket)
    {
        if (id != ticket.TicketId)
        {
            return BadRequest();
        }

        await _ticketService.UpdateTicketAsync(ticket);
        return NoContent();
    }

    // DELETE: api/Tickets/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTicket(int id)
    {
        await _ticketService.DeleteTicketAsync(id);
        return NoContent();
    }
}
