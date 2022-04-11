/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("displayName").notNullable();
    table.string("email").notNullable().unique();
    table.text("passwordHash").notNullable();
    table.text("passwordSalt").notNullable();
    table.text("role").notNullable();
    table.datetime("createdAt").notNullable();
    table.datetime("updatedAt").notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable("users");
}
