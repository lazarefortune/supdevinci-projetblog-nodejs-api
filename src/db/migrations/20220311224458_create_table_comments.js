/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("comments", (table) => {
    table.increments();
    table.text("content").notNullable();
    table.datetime("createdAt").notNullable();
    table.datetime("updatedAt").notNullable();
    table.integer("authorId").notNullable();
    table.integer("postId").notNullable();
    table.foreign("authorId").references("users");
    table.foreign("postId").references("posts");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable("comments");
}
