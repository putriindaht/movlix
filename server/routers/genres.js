const express = require('express')
const router = express.Router()
const ControllerGenre = require('../controllers/controllerGenre')

router.get('/', ControllerGenre.getGenres)

module.exports = router