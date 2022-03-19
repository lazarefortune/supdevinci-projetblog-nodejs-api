/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("posts", (table) => {
    table.increments();
    table.text("title").notNullable();
    table.text("content").notNullable();
    table.datetime("createdAt").notNullable();
    table.datetime("updatedAt").notNullable();
    table.boolean("isPublished").notNullable();
    table.integer("authorId").notNullable();
    table.foreign("authorId").references("users");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable("posts");
}
