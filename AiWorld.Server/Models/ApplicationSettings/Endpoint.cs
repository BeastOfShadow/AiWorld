using System.Text.Json.Serialization;

namespace AiWorld.Server.Models.ApplicationSettings;

public class Endpoint
{
    public int Id { get; set; }
    public string Url { get; set; }
    public DateTime CreatedAt { get; set; }

    [JsonIgnore]
    public Settings? Settings { get; set; }
}
