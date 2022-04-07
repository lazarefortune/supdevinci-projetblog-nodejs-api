// import supertest from "supertest";
// import app from "../src/app";

// const request = supertest(app);

// describe("GET users/", () => {
//   test("should return 200 OK", async () => {
//     const response = await request.get("/");
//     expect(response.status).toBe(200);
//   });
// });

// it("Get all users", async () => {
//   const response = await request.get("/api/users");
//   expect(response.status).toBe(200);
//   // expect(response.body.status).toBe("success");
//   // expect(response.body.data.length).toBe(2);
//   done();
// });

test("test somme math", () => {
  expect(1 + 2).toBe(3);
});

describe("Users tests suites", () => {
  test("test users", () => {
    expect(1 + 2).toBe(3);
  });

  test("test users 2", () => {
    expect(1 + 2).toBe(3);
  });
});
