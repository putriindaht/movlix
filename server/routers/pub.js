const express = require("express");
const router = express.Router();
const ControllerPub = require("../controllers/controllerPub");
const ControllerPubBookmarks = require("../controllers/controllerPubBookmarks");
const custAuthentication = require("../middlewares/custAuthentication");

router.post("/register", ControllerPub.pubRegister);
router.post("/login", ControllerPub.pubLogin);
router.post("/glogin", ControllerPub.pubGlogin);
router.get("/movies", ControllerPub.pubListMovie);
router.get("/movies/:id", ControllerPub.pubMovieDetail);

router.use(custAuthentication);
router.get("/bookmarks", ControllerPubBookmarks.getPubBookmark);
router.post("/bookmarks/:movieId", ControllerPubBookmarks.addPubBookmark);

module.exports = router;
