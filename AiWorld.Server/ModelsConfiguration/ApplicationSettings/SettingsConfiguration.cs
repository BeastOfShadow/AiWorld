using System;
using Microsoft.EntityFrameworkCore;
using AiWorld.Server.Models.ApplicationSettings;
namespace AiWorld.Server.ModelsConfiguration;

public class SettingsConfiguration : IEntityTypeConfiguration<Settings>
{
    public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Settings> builder)
    {
        builder.ToTable("Settings");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Endpoint)
            .IsRequired();

        builder.Property(x => x.ModelName)
                .IsRequired();

        builder.Property(x => x.CreatedAt)
                .IsRequired();
    }
}