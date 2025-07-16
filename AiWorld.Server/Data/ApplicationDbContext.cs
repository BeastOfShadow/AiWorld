using System;
using AiWorld.Server.Models.ApplicationSettings;
using AiWorld.Server.Models.Chats;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Endpoint = AiWorld.Server.Models.ApplicationSettings.Endpoint;

namespace AiWorld.Server.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    public DbSet<Chat> Chats { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Settings> Settings { get; set; }
    public DbSet<Endpoint> Endpoints { get; set; }
    public DbSet<Model> Models { get; set; }
}
