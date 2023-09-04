const express = require("express");
const router = express.Router();
const ControllerMovie = require("../controllers/controllerMovie");
const authorization = require("../middlewares/authorization");
const adminAuthorization = require("../middlewares/adminAuthorization");

router.post("/", ControllerMovie.postMovies);
router.get("/", ControllerMovie.getMovies);
router.get("/:id", ControllerMovie.getMovieDetails);
router.delete("/:id", authorization, ControllerMovie.deleteMovie);

router.put("/:id", authorization, ControllerMovie.putMovies);
router.patch("/:id", adminAuthorization, ControllerMovie.patchMovieStatus);

module.exports = router;
