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
    table.integer("authorId").notNullable().unsigned();
    table.integer("postId").notNullable().unsigned();
    table.foreign("authorId").references("users.id").onDelete("CASCADE");
    table.foreign("postId").references("posts.id").onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable("comments");
}
