using AiWorld.Server.Models.ApplicationSettings;
using AiWorld.Server.Models.Chats;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Dynamic;
using System.Text;
using System.Text.Json;

namespace AiWorld.Server.Controllers.Chats;

[ApiController]
[Route("api/[controller]")]
public class ProxyController : ControllerBase
{
    private readonly ILogger<ProxyController> _logger;
    private readonly IHttpClientFactory _httpClientFactory;

    public ProxyController(ILogger<ProxyController> logger, IHttpClientFactory httpClientFactory)
    {
        _logger = logger;    
        _httpClientFactory = httpClientFactory;
    }

    [HttpPost]
    public async Task QueryAi([FromBody] Proxy proxy)
    {
        ArgumentException.ThrowIfNullOrEmpty(proxy.Url, nameof(proxy.Url));
        if (proxy.Message == null || string.IsNullOrEmpty(proxy.Message.Prompt))
        {
            throw new ArgumentException("Il messaggio e il prompt non possono essere nulli o vuoti.", nameof(proxy.Message));
        }
        _logger.LogDebug("Querying AI provided at {url}", proxy.Url);

        var url = proxy.Url;
        var model = proxy.ModelName;

        using var client = _httpClientFactory.CreateClient("proxy");
        client.BaseAddress = new Uri(url);

        HttpRequestMessage request = new(HttpMethod.Post, "/api/generate");
        dynamic content = new ExpandoObject();
        content.model = model;
        content.prompt = proxy.Message.Prompt;
        request.Content = JsonContent.Create(content);

        using var upstreamResponse = await client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
        upstreamResponse.EnsureSuccessStatusCode();

        Response.ContentType = "application/json";

        await using var upstreamStream = await upstreamResponse.Content.ReadAsStreamAsync();
        using var reader = new StreamReader(upstreamStream, Encoding.UTF8);

        var responseBodyWriter = Response.BodyWriter;

        string? line;
        while ((line = await reader.ReadLineAsync()) != null)
        {
            if (!string.IsNullOrWhiteSpace(line))
            {
                try
                {
                    using JsonDocument jsonDoc = JsonDocument.Parse(line);
                    if (jsonDoc.RootElement.TryGetProperty("response", out JsonElement responseElement))
                    {
                        string? responseValue = responseElement.GetString();
                        if (responseValue != null)
                        {
                            var bytes = Encoding.UTF8.GetBytes(responseValue);
                            await responseBodyWriter.WriteAsync(bytes);
                            await responseBodyWriter.FlushAsync();
                        }
                    }
                }
                catch (JsonException ex)
                {
                    _logger.LogError(ex, "Error during parsing. {message}", ex.Message);
                }
            }
        }

        await responseBodyWriter.CompleteAsync();
    }
}

public class Proxy
{
    public Message Message { get; set; }
    public string Url { get; set; }
    public string ModelName { get; set; }
}