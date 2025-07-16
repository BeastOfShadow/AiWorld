using System;
using AiWorld.Server.Data;
using AiWorld.Server.Models.ApplicationSettings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AiWorld.Server.Controllers.ApplicationSettings;

[ApiController]
[Route("api/[controller]")]
public class ModelController : ControllerBase
{
    private readonly ILogger<ModelController> _logger;
    private readonly ApplicationDbContext _context;

    public ModelController(
        ILogger<ModelController> logger,
        ApplicationDbContext context)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    [HttpGet("GetModels")]
    public async Task<ActionResult<IEnumerable<Model>>> GetModels()
    {
        try
        {
            return Ok(await _context.Models.ToListAsync());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Errore durante il recupero dei modelli");
            return StatusCode(500, "Errore interno del server");
        }
    }
}
