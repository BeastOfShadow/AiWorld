using System;
using System.Text.Json.Serialization;

namespace AiWorld.Server.Models.ApplicationSettings;

public class Model
{
    public int Id { get; set; }
    public string ModelName { get; set; }
    public DateTime CreatedAt { get; set; }

    [JsonIgnore]
    public Settings? Settings { get; set; }
}
