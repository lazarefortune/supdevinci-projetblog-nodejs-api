import faker from "faker"
import { getRandomNumberBetween } from "../../utils/tools.js"

const createFakeComment = () => {
  return {
    content: faker.lorem.paragraph(),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    authorId: getRandomNumberBetween(1, 10),
    postId: getRandomNumberBetween(1, 100),
  }
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("comments").del()
  const fakeComments = []
  const desiredComments = 200
  for (let index = 0; index < desiredComments; index++) {
    fakeComments.push(createFakeComment())
  }
  await knex("comments").insert(fakeComments)
}
