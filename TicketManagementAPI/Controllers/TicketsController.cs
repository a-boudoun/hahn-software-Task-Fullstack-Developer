using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketManagementAPI.Models;
using TicketManagementAPI.Services;
using TicketManagementAPI.Requests;
using TicketManagementAPI.Responses;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public TicketsController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    [HttpGet]
    public async Task<ActionResult<GetTicketsPagedResponse>> GetTickets([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var tickets = await _ticketService.GetAllTicketsAsync(page, pageSize);
        var totalCount = await _ticketService.GetTotalCountAsync();

        var response = new GetTicketsPagedResponse
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

        return Ok(response);
    }

  

    [HttpPost]
    public async Task<ActionResult<GetTicketResponse>> CreateTicket([FromBody] CreateOrUpdateTicketRequest request)
    {
        var ticket = new Ticket
        {
            Description = request.Description,
            Status = request.Status,
            Date = DateTime.UtcNow
        };

        await _ticketService.AddTicketAsync(ticket);

        var response = new GetTicketResponse
        {
            TicketId = ticket.TicketId,
            Description = ticket.Description,
            Status = ticket.Status,
            Date = ticket.Date
        };

        return Ok(response);
    }



    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTicket([FromRoute] int id, [FromBody] CreateOrUpdateTicketRequest request)
    {
        var ticket = new Ticket
        {
            TicketId = id,
            Description = request.Description,
            Status = request.Status,
        };
        await _ticketService.UpdateTicketAsync(ticket);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTicket([FromRoute] int id)
    {
        await _ticketService.DeleteTicketAsync(id);
        return NoContent();
    }
}

 //TODO: add an endpoint for sorting
//TODO: add an endpoint for filltering by status.