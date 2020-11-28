var express = require('express');
var router = express.Router();
import fs from "fs";
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
