import faker from "faker"
import { hashPassword } from "../../security/password/index.js"
import { getRandomRole } from "../../utils/tools.js"

const makeUserPasswordHashAndSalt = (user) => {
  const [passwordHash, passwordSalt] = hashPassword(user.password)

  delete user.password

  return {
    ...user,
    passwordHash,
    passwordSalt,
  }
}

const createInitialUsers = () => {
  let initialUsers = [
    {
      firstName: "AdminFirstName",
      lastName: "AdminLastName",
      displayName: "adminDisplayName",
      email: "admin@gmail.com",
      password: "admin",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: "AuthorFirstName",
      lastName: "AuthorLastName",
      displayName: "authorDisplayName",
      email: "author@gmail.com",
      password: "author",
      role: "author",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: "UserFirstName",
      lastName: "UserLastName",
      displayName: "userDisplayName",
      email: "user@gmail.com",
      password: "user",
      role: "reader",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  const users = initialUsers.map((user) => makeUserPasswordHashAndSalt(user))

  return users
}

const createFakeUser = () => {
  const [passwordHash, passwordSalt] = hashPassword(faker.internet.password())

  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    displayName: faker.internet.userName(),
    email: faker.internet.email(),
    passwordHash: passwordHash,
    passwordSalt: passwordSalt,
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    role: getRandomRole(),
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del()
  const fakeUsers = []
  const desiredUsers = 10
  for (let i = 0; i < desiredUsers; i++) {
    fakeUsers.push(createFakeUser())
  }

  const users = [...createInitialUsers(), ...fakeUsers]

  await knex("users").insert(users)
}
