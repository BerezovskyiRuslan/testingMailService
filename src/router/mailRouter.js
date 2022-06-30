const express = require('express');
const multer = require('multer');
const controller = require('../controller/mailController');

const router = express.Router();
const upload = multer();

router.post('/', upload.any(), controller.getMailService);

module.exports = router;