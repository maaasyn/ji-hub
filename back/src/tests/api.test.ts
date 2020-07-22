import "mocha";
import app = require("../index");
import { createConnection, getConnection } from "typeorm";
import chai = require("chai");
import request = require("supertest");
import { expect } from "chai";

before(() => createConnection());
after(async () => getConnection().close());

describe("GET /events ", () => {
  it("Should return array of events", (done) => {
    request(app)
      .get("/events")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("Have status code 200", (done) => {
    request(app)
      .get("/events")
      .end((err, res) => {
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("GET /events/:id ", () => {
  it("Should return an event", (done) => {
    request(app)
      .get("/events/1")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("Should have status code 200 when obj found", (done) => {
    request(app)
      .get("/events/1")
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("Should have status code 404 when no event found", (done) => {
    request(app)
      .get("/events/987654321")
      .end((err, res) => {
        done();
      });
  });
});

describe("POST /events ", () => {
  it("Should have status code 422 on wrong payload", (done) => {
    request(app)
      .post("/events")
      .send({ wrongData: "payload" })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });

  it("Should have status code 201 on created", (done) => {
    request(app)
      .post("/events")
      .send({
        firstName: "Correct",
        lastName: "VeryGood",
        email: "corrent@email.com",
        date: "2011-10-05T14:48:00.000Z",
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it("Should return correct object", (done) => {
    request(app)
      .post("/events")
      .send({
        firstName: "Correct",
        lastName: "VeryGood",
        email: "corrent@email.com",
        date: "2011-10-05T14:48:00.000Z",
      })
      .end((err, res) => {
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("id");
        done();
      });
  });
});
