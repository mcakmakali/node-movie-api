const express = require('express');
const router = express.Router();

const { get, post, getMovie } =  require("../controllers/movieController.js");

/*  Movie List */
router.get('/', get);
/* Movie Save */
router.post('/', post);
/* Movie Details */
// get movies id 
router.get('/:movie_id', getMovie);

module.exports = router;
