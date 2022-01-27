const chai = require("chai");
chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

// const server = require("../app");
const host = "http://localhost:3001";


describe("Product api", () => {
    /**
     * test particular product
     */
    describe("GET/api/product/id", () => {
        const product_id = 28;
        it("it should return a product info", (done) => {
            chai
                .request(host)
                .get(`/api/product/${product_id}`)
                .set('content-type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        res.should.have.status(200);
                        res.body[0].user_id.should.be.eq(35);
                        res.body[0].product_name.should.be.eq("addsg");
                        done();
                    }

                })
        })
    })

    describe("GET/api/product/id", () => {
        const product_id = 18;
        it("it should return not found", (done) => {
            chai
                .request(host)
                .get(`/api/product/${product_id}`)
                .set('content-type', 'application/json')
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        // res.should.have.status(200);
                        res.body.message.should.be.eq('can not fetch single product');
                        done();
                    }

                })
        })
    })



})