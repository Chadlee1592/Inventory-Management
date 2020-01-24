const express = require('express')
const router = express.Router();

// @route  Get api/auth
// @desc   Test auth
// @access Public 
router.get('/', (req, res) => res.send('Auth Route'))

module.exports = router