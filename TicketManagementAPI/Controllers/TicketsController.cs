using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketManagementAPI.Models;
using TicketManagementAPI.Services;
using TicketManagementAPI.Requests;
using TicketManagementAPI.Responses;
using Microsoft.AspNetCore.Http.HttpResults;

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
    public async Task<ActionResult<GetTicketsPagedResponse>> GetTickets([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? status = null )
    {
        var ticketsPaged = await _ticketService.GetAllTicketsAsync(page, pageSize, status);
        return Ok(ticketsPaged);
    }

  

    [HttpPost]
    public async Task<ActionResult<GetTicketResponse>> CreateTicket([FromBody] CreateOrUpdateTicketRequest request)
    {
        if (request == null)
        {
            return BadRequest("Error while creating a new ticket");
        }

        var ticket = new Ticket
        {
            Description = request.Description,
            Status = request.Status,
            Date = DateTime.UtcNow
        };

        var response = await _ticketService.AddTicketAsync(ticket);

        return Ok(response);
    }



    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateTicket([FromRoute] int id, [FromBody] CreateOrUpdateTicketRequest request)
    {
        if (request == null)
        {
            return BadRequest("Error while updating the ticket");
        }
        await _ticketService.UpdateTicketAsync(id, request.Description, request.Status);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTicket([FromRoute] int id)
    {
        await _ticketService.DeleteTicketAsync(id);
        return NoContent();
    }
}
