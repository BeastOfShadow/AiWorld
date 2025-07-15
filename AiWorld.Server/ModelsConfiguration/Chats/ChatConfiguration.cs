using System;
using AiWorld.Server.Models.Chats;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AiWorld.Server.ModelsConfiguration.Chats;

public class ChatConfiguration : IEntityTypeConfiguration<Chat>
{
    public void Configure(EntityTypeBuilder<Chat> builder)
    {
        builder.ToTable("Chats");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title)
            .IsRequired();

        builder.Property(x => x.ModelUsed)
            .IsRequired();

        builder.Property(x => x.Preview);

        builder.Property(x => x.CreatedAt)
            .IsRequired();

        builder.Property(x => x.LastAccessed);
    }
}
