/* eslint-disable n/handle-callback-err */
/* eslint-disable no-undef */
import chai from "chai"
import chaiHttp from "chai-http"
import server from "../src/server.js"

chai.should()
chai.use(chaiHttp)

describe("Run all comments tests", () => {
  describe("Create comment", () => {
    it("It should return the new comment", (done) => {
      // Sign in user
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: "user@gmail.com",
          password: "user",
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("user")
          res.body.should.have.property("token")
          // Create comment
          chai
            .request(server)
            .post("/api/comments")
            .set("authentication", `${res.body.token}`)
            .send({
              content: "This is a comment",
              postId: 1,
            })
            // eslint-disable-next-line n/handle-callback-err
            .end((err, res) => {
              res.should.have.status(201)
              res.body.should.be.a("object")
              res.body.should.have.property("content")
              done()
            })
        })
    })
  })

  describe("Create comment without sign in", () => {
    it("It should return a 403 error", (done) => {
      chai
        .request(server)
        .post("/api/comments")
        .send({
          text: "This is a comment",
          postId: 1,
        })
        .end((err, res) => {
          res.should.have.status(403)
          res.body.should.be.a("object")
          done()
        })
    })
  })

  describe("Create comment with bad postId", () => {
    it("It should return a 400 error", (done) => {
      // Sign in user
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: "user@gmail.com",
          password: "user",
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("user")
          res.body.should.have.property("token")
          // Create comment
          chai
            .request(server)
            .post("/api/comments")
            .set("authentication", `${res.body.token}`)
            .send({
              content: "This is a comment with bad authorId",
              authorId: 0,
              postId: 0,
            })
            .end((err, res) => {
              res.should.have.status(400)
              res.body.should.be.a("object")
              res.body.should.have.property("message").equal("Missing postId")
              done()
            })
        })
    })
  })

  describe("Create comment with postId who dosn't exist", () => {
    it("It should return a 404 error", (done) => {
      // Sign in user
      chai
        .request(server)
        .post("/api/users/login")
        .send({
          email: "user@gmail.com",
          password: "user",
        })
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("user")
          res.body.should.have.property("token")
          // Create comment
          chai
            .request(server)
            .post("/api/comments")
            .set("authentication", `${res.body.token}`)
            .send({
              content: "This is a comment test",
              authorId: 0,
              postId: 1000,
            })
            .end((err, res) => {
              res.should.have.status(404)
              res.body.should.be.a("object")
              res.body.should.have
                .property("message")
                .equal("No post found with that id")
              done()
            })
        })
    })
  })
})
