const express = require('express');
const router = express.Router();

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome HomePage
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
