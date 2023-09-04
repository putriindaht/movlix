const express = require("express");
const router = express.Router();
const routerGenre = require("../routers/genres");
const routerMovie = require("../routers/movies");
const routerHistory = require("../routers/histories");
const routerPub = require("./pub");
const ControllerUser = require("../controllers/controllerUser");
const authentication = require("../middlewares/authentication");

router.get("/", (req, res) => {
  res.send("Hello there!");
});

router.post("/register", ControllerUser.register);
router.post("/login", ControllerUser.login);
router.post("/glogin", ControllerUser.glogin);
router.use("/pub", routerPub);

// router.use(authentication);

router.use("/histories", authentication, routerHistory);
router.use("/genres", authentication, routerGenre);
router.use("/movies", authentication, routerMovie);

module.exports = router;
