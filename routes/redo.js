const express = require('express');
const router = express.Router();

const service = require('../services/redo');

router.put('/add/:redo/', service.addTask);

module.exports = router;
