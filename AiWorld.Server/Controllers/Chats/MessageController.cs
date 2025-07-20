using AiWorld.Server.Data;
using AiWorld.Server.Models.Chats;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AiWorld.Server.Controllers.Chats;

[ApiController]
[Route("api/[controller]")]
public class MessageController : ControllerBase
{
    private readonly ILogger<MessageController> _logger;
    private readonly ApplicationDbContext _context;

    public MessageController(
        ILogger<MessageController> logger,
        ApplicationDbContext context)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    [HttpGet("GetMessages/{chatId}")]
    public async Task<ActionResult<IEnumerable<Message>>> GetMessages(int chatId)
    {
        return Ok(await _context.Messages.Where(m => m.ChatId == chatId).ToListAsync());
    }

    [HttpPost("SaveMessage")]
    public async Task<ActionResult<Message>> SaveMessage([FromBody] Message message)
    {
        await _context.Messages.AddAsync(message);
        await _context.SaveChangesAsync();
        return Ok(message);
    }
}
