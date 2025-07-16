using System;
using AiWorld.Server.Data;
using AiWorld.Server.Models.ApplicationSettings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AiWorld.Server.Controllers.ApplicationSettings;

[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly ILogger<SettingsController> _logger;
    private readonly ApplicationDbContext _context;

    public SettingsController(
        ILogger<SettingsController> logger,
        ApplicationDbContext context)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    [HttpGet("GetSettings")]
    public async Task<ActionResult<Settings>> GetSettings()
    {
        try
        {
            return Ok(await _context.Settings.FirstOrDefaultAsync());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Errore durante il recupero dei settings");
            return StatusCode(500, "Errore interno del server");
        }
    }


    [HttpGet("GetEndpoint")]
    public async Task<ActionResult<string>> GetEndpoint()
    {
        try
        {
            var settings = await _context.Settings
                .Include(s => s.Endpoint)
                .FirstOrDefaultAsync();

            if (settings?.Endpoint == null || string.IsNullOrEmpty(settings.Endpoint.Url))
                return NotFound("Endpoint non configurato.");

            return Ok(settings.Endpoint.Url);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Errore durante il recupero dell'endpoint");
            return StatusCode(500, "Errore interno del server");
        }
    }

    [HttpGet("GetModelName")]
    public async Task<ActionResult<string>> GetModelName()
    {
        try
        {
            var settings = await _context.Settings
                .Include(s => s.Model)
                .FirstOrDefaultAsync();

            if (settings?.Model == null || string.IsNullOrEmpty(settings.Model.ModelName))
                return NotFound("Modello non configurato.");

            return Ok(settings.Model.ModelName);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Errore durante il recupero del modello");
            return StatusCode(500, "Errore interno del server");
        }
    }
}
