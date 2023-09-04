const request = require("supertest");
const app = require("../app");
const { Bookmark, Customer, Movie } = require("../models");
const { generateToken } = require("../helpers/tokenJWT");

describe("get all bookmarks", () => {
  const customers = require("./customer.json");
  const bookmarks = require("./bookmark.json");
  const movies = require("./movies.json");
  let customer;
  let movieId;
  let token;
  beforeAll(async () => {
    try {
      await Customer.bulkCreate(customers);
      customer = await Customer.findByPk(1);
      await Movie.bulkCreate(movies);
      await Bookmark.bulkCreate(bookmarks);
    } catch (err) {
      console.log(err);
    }
  });

  afterAll(async () => {
    try {
      await Bookmark.sync({ force: true });
      await Movie.sync({ force: true });
      await Customer.sync({ force: true });
    } catch (err) {
      console.log(err);
    }
  });

  it("response all bookmarks with json", async () => {
    try {
      let token = generateToken({
        id: customer.id,
        email: customer.email,
        role: customer.role,
      });

      const response = await request(app)
        //endpoiint
        .get("/pub/bookmarks")
        //header
        .set("Accept", "application/json")
        .set("access_token", token);

      expect(response.status).toEqual(200);
      console.log(response, 1212);
      const responseBody = response.body;
      expect(responseBody.data[0]).toHaveProperty("id", 1);
    } catch (err) {
      console.log(err);
    }
  });

  it("response add bookmarks", async () => {
    try {
      movieId = 4;
      token = generateToken({
        id: customer.id,
        email: customer.email,
        role: customer.role,
      });

      const response = await request(app)
        //endpoiint
        .post("/pub/bookmarks/" + movieId)
        //header
        .set("Accept", "application/json")
        .set("access_token", token);

      expect(response.status).toEqual(201);
      const responseBody = response.body;
      expect(responseBody).toHaveProperty("MovieId", movieId);
    } catch (err) {
      console.log(err);
    }
  });

  it("response add bookmarks but movieId not found", async () => {
    try {
      movieId = 99;
      token = generateToken({
        id: customer.id,
        email: customer.email,
        role: customer.role,
      });

      const response = await request(app)
        //endpoiint
        .post("/pub/bookmarks/" + movieId)
        //header
        .set("Accept", "application/json")
        .set("access_token", token);

      expect(response.status).toEqual(404);
      const responseBody = response.body;
      expect(responseBody).toHaveProperty("message", "Movie Not Found");
    } catch (err) {
      console.log(err);
    }
  });

  it("response add bookmarks but customer not login", async () => {
    try {
      movieId = 9;

      const response = await request(app)
        //endpoiint
        .post("/pub/bookmarks/" + movieId)
        //header
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
      const responseBody = response.body;
      expect(responseBody).toHaveProperty("message", "Please login first");
    } catch (err) {
      console.log(err);
    }
  });

  it("response add bookmarks but token is invalid", async () => {
    movieId = 9;
    token = "jkjkjkjkjk";
    // token = generateToken({
    //   id: 1,
    //   email: "haikal@mail.mail",
    //   role: "Admin",
    // });

    const response = await request(app)
      //endpoiint
      .post("/pub/bookmarks/" + movieId)
      //header
      .set("Accept", "application/json")
      .set("access_token", token);

    expect(response.status).toEqual(401);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty("message", "Invalid token");
  });
});
