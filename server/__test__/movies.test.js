const request = require("supertest");
const app = require("../app");
const { Movie } = require("../models");

describe("get all movies", () => {
  const movies = require("./movies.json");
  beforeAll(async () => {
    try {
      await Movie.bulkCreate(movies);
    } catch (err) {
      console.log(err);
    }
  });

  afterAll(async () => {
    await Movie.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
      force: true,
    });
    // await Movie.sync({ force: true });
  });

  it("response all movies with json", async () => {
    const response = await request(app)
      //endpoiint
      .get("/pub/movies")
      //header
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    const responseBody = response.body;
    console.log(responseBody.data[0], 1111111111);
    expect(responseBody.data[0]).toHaveProperty("title", "Your Name");
  });

  it("response all movies with 1 query filterjson", async () => {
    const response = await request(app)
      //endpoiint
      .get("/pub/movies?title=parasite")
      //header
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    const responseBody = response.body;
    expect(responseBody.data[0]).toHaveProperty("title", "Parasite");
  });

  it("response all movies with pagination", async () => {
    const page = 5;
    const response = await request(app)
      //endpoiint
      .get("/pub/movies?page=2")
      //header
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty("data");
    expect(responseBody.data).toHaveLength(page);
  });

  it("response query movie with params id", async () => {
    const response = await request(app)
      //endpoiint
      .get("/pub/movies/1")
      //header
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    const responseBody = response.body;
    expect(responseBody.data).toHaveProperty("id", 1);
  });

  it("when movie id not found", async () => {
    const page = 5;
    const response = await request(app)
      //endpoiint
      .get("/pub/movies/23")
      //header
      .set("Accept", "application/json");

    expect(response.status).toEqual(404);
    const responseBody = response.body;
    expect(responseBody).toHaveProperty("message", "Movie Not Found");
  });
});
