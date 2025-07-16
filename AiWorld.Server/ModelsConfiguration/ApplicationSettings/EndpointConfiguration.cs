using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Endpoint = AiWorld.Server.Models.ApplicationSettings.Endpoint;

namespace AiWorld.Server.ModelsConfiguration.ApplicationSettings;

public class EndpointConfiguration : IEntityTypeConfiguration<Endpoint>
{
    public void Configure(EntityTypeBuilder<Endpoint> builder)
    {
        builder.ToTable("Endpoints");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Url)
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .IsRequired();
    }
}
