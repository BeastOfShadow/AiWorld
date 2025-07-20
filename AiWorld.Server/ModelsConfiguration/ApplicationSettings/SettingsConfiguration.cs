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

        builder.Property(x => x.EndpointId).IsRequired(false); 

        builder.Property(x => x.ModelId).IsRequired(false); 

        builder.HasOne(s => s.Model)
            .WithOne(m => m.Settings)
            .HasForeignKey<Settings>(s => s.ModelId);

         builder.HasOne(s => s.Endpoint)
            .WithOne(m => m.Settings)
            .HasForeignKey<Settings>(s => s.EndpointId);

        builder.Property(x => x.CreatedAt)
                .IsRequired();
    }
}