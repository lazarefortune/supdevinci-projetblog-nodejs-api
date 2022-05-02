/* eslint-disable no-undef */
import chai from "chai"
import chaiHttp from "chai-http"
import server from "../src/server.js"

chai.should()
chai.use(chaiHttp)

describe("Run all posts tests", () => {
  describe("GET all posts", () => {
    it("It should return all posts", (done) => {
      chai
        .request(server)
        .get("/api/posts")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("total")
          res.body.should.have.property("results")
          done()
        })
    })
  })

  describe("GET post by id", () => {
    it("It should return a post by id", (done) => {
      // login user before get post by id
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
          // get post by id
          chai
            .request(server)
            .get("/api/posts/1")
            .set("authentication", `${res.body.token}`)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a("object")
              res.body.should.have.property("id")
              res.body.should.have.property("title")
              res.body.should.have.property("content")
              res.body.should.have.property("createdAt")
              res.body.should.have.property("updatedAt")
              done()
            })
        })
    })
  })

  describe("GET post whith bad id", () => {
    it("It should return an 404 error", (done) => {
      // login user before get post by id
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
          // get post by id
          chai
            .request(server)
            .get("/api/posts/sd")
            .set("authentication", `${res.body.token}`)
            .end((err, res) => {
              res.should.have.status(404)
              res.body.should.be.a("object")
              res.body.should.have.property("message")
              done()
            })
        })
    })
  })

  describe("GET post by id without sign in user", () => {
    it("It should return a 403 error", (done) => {
      // get post by id
      chai
        .request(server)
        .get("/api/posts/1")
        .end((err, res) => {
          res.should.have.status(403)
          res.body.should.be.a("object")
          done()
        })
    })
  })

  describe("POST add new post", () => {
    it("It should return the new post", (done) => {
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
          chai
            .request(server)
            .post("/api/posts")
            .set("authentication", `${res.body.token}`)
            .send({
              title: "Post 1",
              content: "Content 1",
              isPublished: 1,
            })
            .end((err, res) => {
              res.should.have.status(201)
              res.body.should.be.a("object")
              res.body.should.have.property("id")
              res.body.should.have.property("title")
              res.body.should.have.property("content")
              res.body.should.have.property("createdAt")
              res.body.should.have.property("updatedAt")
              done()
            })
        })
    })
  })

  describe("POST add post with user role reader", () => {
    it("It should return a 403 error", (done) => {
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
          chai
            .request(server)
            .post("/api/posts")
            .set("authentication", `${res.body.token}`)
            .end((err, res) => {
              res.should.have.status(403)
              res.body.should.be.a("object")
              res.body.should.have.property("message")
              done()
            })
        })
    })
  })

  describe("POST add new post without sign in user", () => {
    it("It should return a 403 error", (done) => {
      // get post by id
      chai
        .request(server)
        .post("/api/posts")
        .send({
          title: "Post 1",
          content: "Content 1",
          isPublished: 1,
        })
        .end((err, res) => {
          res.should.have.status(403)
          res.body.should.be.a("object")
          done()
        })
    })
  })

  describe("PUT update post", () => {
    it("It should return the updated post", (done) => {
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
          chai
            .request(server)
            .put("/api/posts/1")
            .set("authentication", `${res.body.token}`)
            .send({
              title: "Post 1 Updated",
              content: "Content 1 Updated",
              isPublished: 0,
            })
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a("object")
              res.body.should.have.property("id")
              res.body.should.have.property("title")
              res.body.should.have.property("content")
              res.body.should.have.property("createdAt")
              res.body.should.have.property("updatedAt")
              done()
            })
        })
    })
  })

  describe("PUT update post whit user role reader", () => {
    it("It should return a 403 error", (done) => {
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
          chai
            .request(server)
            .put("/api/posts/1")
            .set("authentication", `${res.body.token}`)
            .send({
              title: "Post 1 Updated",
              content: "Content 1 Updated",
              isPublished: 0,
            })
            .end((err, res) => {
              res.should.have.status(403)
              res.body.should.be.a("object")
              res.body.should.have.property("message")
              done()
            })
        })
    })
  })

  describe("DELETE post", () => {
    it("It should return the deleted message", (done) => {
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
          chai
            .request(server)
            .delete("/api/posts/1")
            .set("authentication", `${res.body.token}`)
            .end((err, res) => {
              res.should.have.status(200)
              res.body.should.be.a("object")
              res.body.should.have.property("message").equal("Post deleted")
              done()
            })
        })
    })
  })

  describe("DELETE post with user who is not the author", () => {
    it("It should return the deleted message", (done) => {
      const author = {
        email: "author@gmail.com",
        password: "author",
      }

      const otherAuthor = {
        email: "otherauthor@gmail.com",
        password: "Author2022@",
      }

      let postId = 0

      // sign in author
      chai
        .request(server)
        .post("/api/users/login")
        .send(author)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("user")
          res.body.should.have.property("token")
          // Create post
          chai
            .request(server)
            .post("/api/posts")
            .set("authentication", `${res.body.token}`)
            .send({
              title: "Post test",
              content: "Content test",
              isPublished: 1,
            })
            .end((err, res) => {
              res.should.have.status(201)
              res.body.should.be.a("object")
              res.body.should.have.property("id")
              postId = res.body.id

              // Sign up other author
              chai
                .request(server)
                .post("/api/users/register")
                .send({
                  ...otherAuthor,
                  firstName: "author2FN",
                  lastName: "author2LN",
                  displayName: "Author Other",
                })
                .end((err, res) => {
                  res.should.have.status(201)
                  res.body.should.be.a("object")
                  res.body.should.have.property("id")

                  // Sign in the second author
                  chai
                    .request(server)
                    .post("/api/users/login")
                    .send(otherAuthor)
                    .end((err, res) => {
                      res.should.have.status(200)
                      res.body.should.be.a("object")
                      res.body.should.have.property("user")
                      res.body.should.have.property("token")
                      // Delete post
                      chai
                        .request(server)
                        .delete(`/api/posts/${postId}`)
                        .set("authentication", `${res.body.token}`)
                        .end((err, res) => {
                          res.should.have.status(403)
                          res.body.should.be.a("object")
                          res.body.should.have
                            .property("message")
                            .equal(
                              "You are not authorized to perform this action"
                            )
                          done()
                        })
                    })
                })
            })
        })
    })
  })

  describe("DELETE post with user who is not granted access", () => {
    it("It should return a 403 error", (done) => {
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
          chai
            .request(server)
            .delete("/api/posts/1")
            .set("authentication", `${res.body.token}`)
            .end((err, res) => {
              res.should.have.status(403)
              res.body.should.be.a("object")
              res.body.should.have.property("message")
              done()
            })
        })
    })
  })
})
