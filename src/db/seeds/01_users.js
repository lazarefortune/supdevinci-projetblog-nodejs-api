import faker from "faker";
import hashPassword from "../../../src/security/password/hashPassword.js";
import { getRandomNumberBetween } from "../../utils/tools.js";

const createFakeUser = () => {
  const [passwordHash, passwordSalt] = hashPassword(faker.internet.password());

  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    displayName: faker.internet.userName(),
    email: faker.internet.email(),
    passwordHash: passwordHash,
    passwordSalt: passwordSalt,
    createdAt: faker.datatype.datetime(),
    updatedAt: faker.datatype.datetime(),
    roleId: getRandomNumberBetween(1, 3),
  };
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  const fakeUsers = [];
  const desiredUsers = 10;
  for (let i = 0; i < desiredUsers; i++) {
    fakeUsers.push(createFakeUser());
  }
  await knex("users").insert(fakeUsers);
}
