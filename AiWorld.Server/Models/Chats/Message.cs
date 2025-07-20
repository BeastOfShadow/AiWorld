using System;
using AiWorld.Server.Enums.Chat;

namespace AiWorld.Server.Models.Chats;

public class Message
{
    public int Id { get; set; }
    public string Prompt { get; set; } 
    public string? Embedding { get; set; }
    public SenderType Sender { get; set; }
    public Chat? Chat { get; set; }
    public int ChatId { get; set; }
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
}
