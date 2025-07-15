using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AiWorld.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedChat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Chats",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Chats",
                newName: "Preview");

            migrationBuilder.RenameColumn(
                name: "ModelName",
                table: "Chats",
                newName: "ModelUsed");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Chats",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastAccessed",
                table: "Chats",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "LastAccessed",
                table: "Chats");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Chats",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "Preview",
                table: "Chats",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "ModelUsed",
                table: "Chats",
                newName: "ModelName");
        }
    }
}
