using System;
using AiWorld.Server.Data;
using AiWorld.Server.Models.ApplicationSettings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Endpoint = AiWorld.Server.Models.ApplicationSettings.Endpoint;

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

    public class UpdateSettingsDto
    {
        public int? EndpointId { get; set; }
        public int? ModelId { get; set; }
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

    [HttpPost("CreateModel")]
    public async Task<ActionResult<Model>> CreateModel([FromBody] Model model)
    {
        ArgumentNullException.ThrowIfNull(model, nameof(model));
        model.CreatedAt = DateTime.UtcNow;
        await _context.Models.AddAsync(model);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(CreateModel), model);
    }

    [HttpPost("CreateEndpoint")]
    public async Task<ActionResult<Endpoint>> CreateEndpoint([FromBody] Endpoint endpoint)
    {
        ArgumentNullException.ThrowIfNull(endpoint, nameof(endpoint));
        endpoint.CreatedAt = DateTime.UtcNow;
        await _context.Endpoints.AddAsync(endpoint);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(CreateEndpoint), endpoint);
    }

    [HttpPut("UpdateSettings")]
    public async Task<ActionResult<Settings>> UpdateSettings([FromBody] UpdateSettingsDto dto)
    {
        _logger.LogDebug("\nInizio UpdateSettings - EndpointId: {EndpointId}, ModelId: {ModelId}\n", 
        dto.EndpointId, dto.ModelId);

        if (!ModelState.IsValid) return BadRequest(ModelState);

        var settings = await _context.Settings.FirstOrDefaultAsync();
        if (settings == null)
        {
            settings = new Settings();
            _context.Settings.Add(settings);
        }

        if (dto.EndpointId.HasValue)
        {
            var endpointExists = await _context.Endpoints.AnyAsync(e => e.Id == dto.EndpointId);
            if (!endpointExists) return NotFound("Endpoint non trovato");
            settings.EndpointId = dto.EndpointId.Value;
        }

        if (dto.ModelId.HasValue)
        {
            var modelExists = await _context.Models.AnyAsync(m => m.Id == dto.ModelId);
            if (!modelExists) return NotFound("Modello non trovato");
            settings.ModelId = dto.ModelId.Value;
        }

        await _context.SaveChangesAsync();
        return Ok(settings);
    }
}
