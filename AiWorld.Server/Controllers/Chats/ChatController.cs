using System;
using AiWorld.Server.Data;
using AiWorld.Server.Models.Chats;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AiWorld.Server.Controllers.Chats;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly ILogger<ChatController> _logger;
    private readonly ApplicationDbContext _context;

    public ChatController(
        ILogger<ChatController> logger,
        ApplicationDbContext context)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    [HttpGet("GetChats")]
    public async Task<ActionResult<IEnumerable<Chat>>> GetChats()
    {
        try
        {
            return Ok(await _context.Chats.ToListAsync());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Errore durante il recupero delle chat");
            return StatusCode(500, "Errore interno del server");
        }
    }

    [HttpPost("CreateChat")]
    public async Task<ActionResult<Chat>> CreateChat([FromBody] Chat chat)
    {
        _context.Chats.Add(chat);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetChats), new { id = chat.Id }, chat);
    }

    [HttpPost("DeleteChat")]
    public async Task<ActionResult<Chat>> DeleteChat([FromBody] int id)
    {
        _context.Chats.Remove(chat);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetChats), new { id = chat.Id }, chat);
    }
}
