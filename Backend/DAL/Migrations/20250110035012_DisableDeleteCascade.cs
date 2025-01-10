using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class DisableDeleteCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workers_FishFarms_FishFarmId",
                table: "Workers");

            migrationBuilder.AddForeignKey(
                name: "FK_Workers_FishFarms_FishFarmId",
                table: "Workers",
                column: "FishFarmId",
                principalTable: "FishFarms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workers_FishFarms_FishFarmId",
                table: "Workers");

            migrationBuilder.AddForeignKey(
                name: "FK_Workers_FishFarms_FishFarmId",
                table: "Workers",
                column: "FishFarmId",
                principalTable: "FishFarms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
