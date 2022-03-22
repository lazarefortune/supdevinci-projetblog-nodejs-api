/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("roles").del();
  await knex("roles").insert([
    { name: "admin", orderPriority: 1 },
    { name: "author", orderPriority: 2 },
    { name: "reader", orderPriority: 3 },
  ]);
}
