/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("roles", (table) => {
    table.increments();
    table.string("name").notNullable().unique();
    table.integer("orderPriority").notNullable().unique();
  });

  await knex.schema.alterTable("users", (table) => {
    table.integer("roleId");
    table.foreign("roleId").references("roles");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable("roles");
}
