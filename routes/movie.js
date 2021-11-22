const express = require('express');
const router = express.Router();

const movieController = require("../controllers/movieController");

/* GET users listing. */
router.post('/', movieController.post);

module.exports = router;
