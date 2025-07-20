using System;
using AiWorld.Server.Models.ApplicationSettings;
using AiWorld.Server.Models.Chats;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<ActionResult> QueryAi([FromBody] Proxy proxy)
    {
        ArgumentException.ThrowIfNullOrEmpty(proxy.Url);
        var url = proxy.Url;
        var model = proxy.ModelName;
        using var client = _httpClientFactory.CreateClient("proxy");
        client.BaseAddress = new Uri(url);
        HttpRequestMessage request = new(HttpMethod.Post, "/api/generate");
        request.Content = JsonContent.Create($"{{ \"model\": \"{model}\", \"prompt\": \"{proxy.Message.Prompt}\"}}");
        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();

        return Ok(response.Content);
    }
}

public class Proxy
{
    public Message Message { get; set; }
    public string Url { get; set; }
    public string ModelName { get; set; }
}