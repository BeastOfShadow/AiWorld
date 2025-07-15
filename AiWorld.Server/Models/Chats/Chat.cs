using System;

namespace AiWorld.Server.Models.Chats;

public class Chat
{
    public int Id { get; set; }
    public string Name { get; set; } 
    public string ModelName { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
