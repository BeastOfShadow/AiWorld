using System;

namespace AiWorld.Server.Models.ApplicationSettings;

public class Settings
{
    public int Id { get; set; }
    public string Endpoint { get; set; }
    public string ModelName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
