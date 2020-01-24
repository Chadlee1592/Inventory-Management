const express = require('express')
const router = express.Router();

// @route  Get api/salesOrder
// @desc   Test auth
// @access Public 
router.get('/', (req, res) => res.send('SO Route'))

module.exports = router