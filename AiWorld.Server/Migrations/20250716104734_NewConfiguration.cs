using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AiWorld.Server.Migrations
{
    /// <inheritdoc />
    public partial class NewConfiguration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Endpoint",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "ModelName",
                table: "Settings");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Models",
                newName: "ModelName");

            migrationBuilder.AddColumn<int>(
                name: "EndpointId",
                table: "Settings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ModelId",
                table: "Settings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Settings_EndpointId",
                table: "Settings",
                column: "EndpointId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Settings_ModelId",
                table: "Settings",
                column: "ModelId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Settings_Endpoints_EndpointId",
                table: "Settings",
                column: "EndpointId",
                principalTable: "Endpoints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Settings_Models_ModelId",
                table: "Settings",
                column: "ModelId",
                principalTable: "Models",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Settings_Endpoints_EndpointId",
                table: "Settings");

            migrationBuilder.DropForeignKey(
                name: "FK_Settings_Models_ModelId",
                table: "Settings");

            migrationBuilder.DropIndex(
                name: "IX_Settings_EndpointId",
                table: "Settings");

            migrationBuilder.DropIndex(
                name: "IX_Settings_ModelId",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "EndpointId",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "ModelId",
                table: "Settings");

            migrationBuilder.RenameColumn(
                name: "ModelName",
                table: "Models",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Endpoint",
                table: "Settings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ModelName",
                table: "Settings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
