using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AiWorld.Server.Data;
using AiWorld.Server.Requests;
using System.Reflection;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.in quello 
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

#region Connection to the database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));
    builder.Services.AddDatabaseDeveloperPageExceptionFilter();
#endregion

#region Identity configuration
builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<ApplicationDbContext>();
#endregion

#region MediatR configuration
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(IQueryService).Assembly, Assembly.GetExecutingAssembly()));
#endregion

#region AutoMapper configuration
var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);
#endregion

builder.Services.AddEndpointsApiExplorer();  // Necessario per .NET 7+
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "AI World API",
        Version = "v1",
        Description = "API documentation for AiWorld"
    });

    c.EnableAnnotations();
    
    // Aggiungi i commenti XML (opzionale ma consigliato)
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "AiWorld API v1");
});

app.MapFallbackToFile("/index.html");

app.Run();
