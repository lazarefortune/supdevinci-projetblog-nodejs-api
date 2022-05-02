import faker from "faker"
import { getRandomNumberBetween } from "../../utils/tools.js"

const createFakePost = () => {
  return {
    title: faker.name.title(),
    content: faker.lorem.paragraph(faker.datatype.number({ min: 20, max: 40 })),
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    isPublished: faker.datatype.boolean(),
    authorId: getRandomNumberBetween(1, 10),
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("posts").del()
  const fakePosts = []
  const desiredPosts = 100
  for (let index = 0; index < desiredPosts; index++) {
    fakePosts.push(createFakePost())
  }

  await knex("posts").insert(fakePosts)
}
