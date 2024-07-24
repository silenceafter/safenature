using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace app.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "hazard_class",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    description = table.Column<string>(type: "character varying", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("hazard_class_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "partners",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "character varying", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("partners_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("roles_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "transaction_types",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("transaction_types_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "hazardous_waste",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    hazard_class_id = table.Column<int>(type: "integer", nullable: false),
                    bonuses = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("hazardous_waste_pkey", x => x.id);
                    table.ForeignKey(
                        name: "hazardous_waste_hazard_class_id_fkey",
                        column: x => x.hazard_class_id,
                        principalTable: "hazard_class",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "discounts",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false, defaultValueSql: "nextval('discounts_in_stores_id_seq'::regclass)"),
                    partner_id = table.Column<int>(type: "integer", nullable: false),
                    terms = table.Column<string>(type: "character varying", nullable: false),
                    date_start = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    date_end = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    bonuses = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("discounts_in_stores_pkey", x => x.id);
                    table.ForeignKey(
                        name: "discounts_partner_id_fkey",
                        column: x => x.partner_id,
                        principalTable: "partners",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    encrypt = table.Column<string>(type: "text", nullable: false),
                    bonuses = table.Column<int>(type: "integer", nullable: false),
                    role_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("users_pkey", x => x.id);
                    table.ForeignKey(
                        name: "users_role_id_fkey",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "transactions",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<int>(type: "integer", nullable: false),
                    type_id = table.Column<int>(type: "integer", nullable: false),
                    date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    bonuses_start = table.Column<int>(type: "integer", nullable: false),
                    bonuses_end = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("transactions_pkey", x => x.id);
                    table.ForeignKey(
                        name: "transactions_type_id_fkey",
                        column: x => x.type_id,
                        principalTable: "transaction_types",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "transactions_user_id_fkey",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "acceptance",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false, defaultValueSql: "nextval('waste_disposal_id_seq'::regclass)"),
                    transaction_id = table.Column<int>(type: "integer", nullable: false),
                    hazardous_waste_id = table.Column<int>(type: "integer", nullable: false),
                    date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("waste_disposal_pkey", x => x.id);
                    table.ForeignKey(
                        name: "acceptance_transaction_id_fkey",
                        column: x => x.transaction_id,
                        principalTable: "transactions",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "waste_disposal_hazardous_waste_id_fkey",
                        column: x => x.hazardous_waste_id,
                        principalTable: "hazardous_waste",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "receiving_discounts",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false, defaultValueSql: "nextval('discounts_history_id_seq'::regclass)"),
                    transaction_id = table.Column<int>(type: "integer", nullable: false),
                    discount_id = table.Column<int>(type: "integer", nullable: false),
                    date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("discounts_history_pkey", x => x.id);
                    table.ForeignKey(
                        name: "discounts_history_discount_id_fkey",
                        column: x => x.discount_id,
                        principalTable: "discounts",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "receiving_discounts_transaction_id_fkey",
                        column: x => x.transaction_id,
                        principalTable: "transactions",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_acceptance_hazardous_waste_id",
                table: "acceptance",
                column: "hazardous_waste_id");

            migrationBuilder.CreateIndex(
                name: "IX_acceptance_transaction_id",
                table: "acceptance",
                column: "transaction_id");

            migrationBuilder.CreateIndex(
                name: "IX_discounts_partner_id",
                table: "discounts",
                column: "partner_id");

            migrationBuilder.CreateIndex(
                name: "IX_hazardous_waste_hazard_class_id",
                table: "hazardous_waste",
                column: "hazard_class_id");

            migrationBuilder.CreateIndex(
                name: "IX_receiving_discounts_discount_id",
                table: "receiving_discounts",
                column: "discount_id");

            migrationBuilder.CreateIndex(
                name: "IX_receiving_discounts_transaction_id",
                table: "receiving_discounts",
                column: "transaction_id");

            migrationBuilder.CreateIndex(
                name: "IX_transactions_type_id",
                table: "transactions",
                column: "type_id");

            migrationBuilder.CreateIndex(
                name: "IX_transactions_user_id",
                table: "transactions",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_users_role_id",
                table: "users",
                column: "role_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "acceptance");

            migrationBuilder.DropTable(
                name: "receiving_discounts");

            migrationBuilder.DropTable(
                name: "hazardous_waste");

            migrationBuilder.DropTable(
                name: "discounts");

            migrationBuilder.DropTable(
                name: "transactions");

            migrationBuilder.DropTable(
                name: "hazard_class");

            migrationBuilder.DropTable(
                name: "partners");

            migrationBuilder.DropTable(
                name: "transaction_types");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "roles");
        }
    }
}
