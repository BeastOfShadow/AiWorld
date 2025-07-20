using System;
using AiWorld.Server.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Endpoint = AiWorld.Server.Models.ApplicationSettings.Endpoint;

namespace AiWorld.Server.Controllers.ApplicationSettings;

[ApiController]
[Route("api/[controller]")]
public class EndpointController : ControllerBase
{
    private readonly ILogger<EndpointController> _logger;
    private readonly ApplicationDbContext _context;

    public EndpointController(
        ILogger<EndpointController> logger,
        ApplicationDbContext context)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    [HttpPost("CreateEndpoint")]
    public async Task<ActionResult<Endpoint>> CreateEndpoint([FromBody] Endpoint endpoint)
    {
        _context.Endpoints.Add(endpoint);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEndpoints), new { id = endpoint.Id }, endpoint);
    }

    [HttpDelete("DeleteEndpoint/{id}")]
    public async Task<ActionResult<Endpoint>> DeleteEndpoint(int id)
    {
        var endpoint = await _context.Endpoints.FindAsync(id);
        if (endpoint == null) return NotFound();

        _context.Endpoints.Remove(endpoint);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    
    [HttpGet("GetEndpoints")]
    public async Task<ActionResult<IEnumerable<Endpoint>>> GetEndpoints()
    {
        try
        {
            return Ok(await _context.Endpoints.ToListAsync());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Errore durante il recupero degli endpoints");
            return StatusCode(500, "Errore interno del server");
        }
    }
}
