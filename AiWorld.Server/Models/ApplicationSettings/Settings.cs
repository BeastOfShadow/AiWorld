using System;

namespace AiWorld.Server.Models.ApplicationSettings;

public class Settings
{
    public int Id { get; set; }
    public int EndpointId { get; set; }
    public Endpoint Endpoint { get; set; }
    public int ModelId { get; set; }
    public Model Model { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
