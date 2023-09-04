const request = require("supertest");
const app = require("../app");
const { Customer } = require("../models");
const { generateToken } = require("../helpers/tokenJWT");

describe("login", () => {
  let customer;
  beforeAll(async () => {
    customer = await Customer.create({
      email: "test1@mail.com",
      password: "123456",
    });
  });

  afterAll(async () => {
    customer = await Customer.destroy({
      where: {
        email: "test1@mail.com",
      },
    });
  });

  it("response with json", async () => {
    try {
      const response = await request(app)
        //endpoiint
        .post("/pub/login")
        //header
        .set("Accept", "application/json")
        //body
        .send({ email: "test1@mail.com", password: "123456" });

      const token = generateToken({
        id: customer.id,
        email: customer.email,
        role: customer.role,
      });
      expect(response.status).toEqual(200);
      const responseBody = response.body;
      expect(responseBody).toHaveProperty("access_token", token);
    } catch (err) {
      console.log(err, 111111);
    }
  });

  it("when password invalid", async () => {
    const response = await request(app)
      //endpoiint
      .post("/pub/login")
      //header
      .set("Accept", "application/json")
      //body
      .send({ email: "test1@mail.com", password: "123458" });

    console.log(response);

    expect(response.status).toEqual(401);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty("message", "Invalid email or password");
  });

  it("when email invalid", async () => {
    const response = await request(app)
      //endpoiint
      .post("/pub/login")
      //header
      .set("Accept", "application/json")
      //body
      .send({ email: "test1@ail.com", password: "123456" });

    console.log(response);

    expect(response.status).toEqual(401);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty("message", "Invalid email or password");
  });
});

describe("register", () => {
  let customer;

  afterAll(async () => {
    customer = await Customer.destroy({
      where: {
        email: "test1@mail.com",
      },
    });
  });

  it("response with json", async () => {
    const response = await request(app)
      //endpoiint
      .post("/pub/register")
      //header
      .set("Accept", "application/json")
      //body
      .send({ email: "test1@mail.com", password: "123456" });

    expect(response.status).toEqual(201);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty("message", "Success register");
  });

  it("when email is empty", async () => {
    const response = await request(app)
      //endpoiint
      .post("/pub/register")
      //header
      .set("Accept", "application/json")
      //body
      .send({ email: "", password: "123458" });

    expect(response.status).toEqual(400);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty("message", [
      "Email is required",
      "Email must be an email format",
    ]);
  });

  it("when password is empty", async () => {
    const response = await request(app)
      //endpoiint
      .post("/pub/register")
      //header
      .set("Accept", "application/json")
      //body
      .send({ email: "test1@mail.com", password: "" });

    expect(response.status).toEqual(400);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty("message", ["Password is required"]);
  });

  it("when email is null", async () => {
    const response = await request(app)
      //endpoiint
      .post("/pub/register")
      //header
      .set("Accept", "application/json")
      //body
      .send({ password: "123456" });

    expect(response.status).toEqual(400);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty("message", ["Email is required"]);
  });

  it("when password is null", async () => {
    const response = await request(app)
      //endpoiint
      .post("/pub/register")
      //header
      .set("Accept", "application/json")
      //body
      .send({ email: "test1@mail.com" });

    expect(response.status).toEqual(400);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty("message", ["Password is required"]);
  });

  it("when email is registered", async () => {
    const response = await request(app)
      //endpoiint
      .post("/pub/register")
      //header
      .set("Accept", "application/json")
      //body
      .send({ email: "test1@mail.com", password: "123456" });

    expect(response.status).toEqual(400);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty("message", [
      "Email already registered",
    ]);
  });

  it("when email is invalid format", async () => {
    const response = await request(app)
      //endpoiint
      .post("/pub/register")
      //header
      .set("Accept", "application/json")
      //body
      .send({ email: "test", password: "123456" });

    expect(response.status).toEqual(400);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty("message", [
      "Email must be an email format",
    ]);
  });
});
