using System;

namespace AiWorld.Server.Models.Chats;

public class Chat
{
    public int Id { get; set; }
    public string Title { get; set; } 
    public string ModelUsed { get; set; }
    public string Preview { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastAccessed { get; set; } = DateTime.UtcNow;

    public IEnumerable<Message> Messages { get; set; }
}