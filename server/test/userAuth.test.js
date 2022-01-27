const chai = require("chai");
chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

// const server = require("../app");

describe("Auth api", () => {
    /**
     * test login
     */
    describe("POST/api/user/login", () => {
        const host = "http://localhost:3001";
        const user = {
            email: "samanta89511@gmail.com",
            password: "1234"
        }
        it("it should logged in a valid user", (done) => {
            chai
                .request(host)
                .post(`/api/user/login`)
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        res.should.have.status(200);
                        res.body.user_id.should.be.eq(37);
                        done();
                    }

                })
        })
    })
    /**
     * wrong email id,
     */
    describe("POST/api/user/login", () => {
        const host = "http://localhost:3001";
        const user = {
            email: "samanta89511@gmail.co",
            password: "1234"
        }
        it("it should logged in a valid user", (done) => {
            chai
                .request(host)
                .post(`/api/user/login`)
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        res.body.message.should.be.eq("User not found");
                        done();
                    }

                })
        })
    })

    /**
     * test access token
     */
    describe("POST/api/user/login", () => {
        const host = "http://localhost:3001";
        const user = {
            email: "samanta89511@gmail.co",
            password: "1234"
        }
        it("it should logged in a valid user", (done) => {
            chai
                .request(host)
                .post(`/api/user/login`)
                .set('content-type', 'application/json')
                .send(user)
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        res.body.message.should.be.eq("User not found");
                        done();
                    }

                })
        })
    })
})