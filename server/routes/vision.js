var express = require('express');
var router = express.Router();
var path = require("path");
import detectarInfo from '#root/ayudantes/vision';
/* GET home page. */
router.get('/', async function (req, res, next) {
    console.log(path.resolve("/imagenes/prueba.jpeg"));
    const respuesta = await detectarInfo(path.resolve("/imagenes/prueba.jpeg"));
    res.json({ "prueba": respuesta });
});

module.exports = router;
