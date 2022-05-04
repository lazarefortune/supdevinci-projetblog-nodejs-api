/* eslint-disable n/handle-callback-err */
/* eslint-disable no-undef */
import chai from "chai"
import chaiHttp from "chai-http"
import server from "../src/server.js"

chai.should()
chai.use(chaiHttp)

describe("Run all users tests", () => {
  describe("Sign in user", () => {
    it("It should return a token and user informations", (done) => {
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: "admin@gmail.com",
          password: "admin",
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("user")
          res.body.should.have.property("token")
          done()
        })
    })
  })

  describe("Sign in user with bad password", () => {
    it("It should return a 401 error", (done) => {
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: "admin@gmail.com",
          password: "badPassword",
        })
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.a("object")
          res.body.should.have
            .property("message")
            .equal("Invalid email or password")
          done()
        })
    })
  })

  describe("Sign in user with bad email", () => {
    it("It should return a 401 error", (done) => {
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: "badEmail@gmail.com",
          password: "admin",
        })
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.a("object")
          res.body.should.have
            .property("message")
            .equal("Invalid email or password")
          done()
        })
    })
  })

  describe("Sign in user with bad email format", () => {
    it("It should return a 401 error", (done) => {
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: "bal@.m",
          password: "admin",
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a("object")
          res.body.should.have.property("message").equal("Invalid email format")
          done()
        })
    })
  })

  describe("Sign in user with bad email and bad password", () => {
    it("It should return a 401 error", (done) => {
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: "bademail@gmail.com",
          password: "badpassword",
        })
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.a("object")
          res.body.should.have
            .property("message")
            .equal("Invalid email or password")
          done()
        })
    })
  })

  describe("Sign up user with good credentials", () => {
    it("It should return a user informations", (done) => {
      const fakeUser = {
        firstName: "Lazare",
        lastName: "Fortune",
        displayName: "Lazare Fortune",
        email: "lazarefortune@gmail.com",
        password: "Lazare2022@",
      }

      chai
        .request(server)
        .post("/api/users/register")
        .send(fakeUser)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a("object")
          done()
        })
    })
  })

  describe("Sign up user with bad email", () => {
    it("It should return an error", (done) => {
      const fakeUser = {
        firstName: "Lazare",
        lastName: "Fortune",
        displayName: "Lazare Fortune",
        email: "s@g.c",
        password: "password",
      }

      chai
        .request(server)
        .post("/api/users/register")
        .send(fakeUser)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a("object")
          done()
        })
    })
  })

  describe("Sign up user with bad already exist email", () => {
    it("It should return a 409 error", (done) => {
      const fakeUser = {
        firstName: "Lazare",
        lastName: "Fortune",
        displayName: "Lazare Fortune",
        email: "admin@gmail.com",
        password: "password",
      }

      chai
        .request(server)
        .post("/api/users/register")
        .send(fakeUser)
        .end((err, res) => {
          res.should.have.status(409)
          res.body.should.be.a("object")
          done()
        })
    })
  })

  describe("Sign up user with bad password", () => {
    it("It should return an error", (done) => {
      const fakeUser = {
        firstName: "Lazare",
        lastName: "Fortune",
        displayName: "Lazare Fortune",
        email: "lazarefortune2@gmail.com",
        password: "",
      }

      chai
        .request(server)
        .post("/api/users/register")
        .send(fakeUser)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a("object")
          done()
        })
    })
  })
})
