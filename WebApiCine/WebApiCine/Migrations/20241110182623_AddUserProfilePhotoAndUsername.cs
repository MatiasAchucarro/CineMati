using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiCine.Migrations
{
    /// <inheritdoc />
    public partial class AddUserProfilePhotoAndUsername : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NameUser",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "URLFotoPerfilId",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_URLFotoPerfilId",
                table: "User",
                column: "URLFotoPerfilId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Imagen_URLFotoPerfilId",
                table: "User",
                column: "URLFotoPerfilId",
                principalTable: "Imagen",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Imagen_URLFotoPerfilId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_User_URLFotoPerfilId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "NameUser",
                table: "User");

            migrationBuilder.DropColumn(
                name: "URLFotoPerfilId",
                table: "User");
        }
    }
}
