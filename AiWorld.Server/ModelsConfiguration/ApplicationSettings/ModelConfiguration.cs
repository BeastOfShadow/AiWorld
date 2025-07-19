using System;
using AiWorld.Server.Models.ApplicationSettings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AiWorld.Server.ModelsConfiguration.ApplicationSettings;

public class ModelConfiguration : IEntityTypeConfiguration<Model>
{
    public void Configure(EntityTypeBuilder<Model> builder)
    {
        builder.ToTable("Models");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.ModelName)
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .IsRequired();

        builder.HasOne(m => m.Settings)
            .WithOne(s => s.Model)
            .HasForeignKey<Settings>(s => s.ModelId)
            .IsRequired(false);
    }
}
