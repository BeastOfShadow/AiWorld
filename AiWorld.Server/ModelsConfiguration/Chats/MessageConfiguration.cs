using System;
using AiWorld.Server.Models.Chats;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AiWorld.Server.ModelsConfiguration.Chats;

public class MessageConfiguration : IEntityTypeConfiguration<Message>
{
    public void Configure(EntityTypeBuilder<Message> builder)
    {
        builder.ToTable("Messages");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Prompt)
            .IsRequired();

        builder.Property(x => x.Embedding);

        builder.Property(x => x.Sender)
            .IsRequired();

        builder.Property(x => x.SentAt)
                .IsRequired();

        builder.HasOne(x => x.Chat)
            .WithMany(c => c.Messages)
            .HasForeignKey(x => x.ChatId)
            .IsRequired();
    }
}
