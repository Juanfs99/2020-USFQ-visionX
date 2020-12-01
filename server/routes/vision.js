var express = require('express');
var router = express.Router();
var path = require("path");
import detectarInfo from '#root/ayudantes/vision'; //aqui importo la funcion detectarInfo desde el archivo ayudantes/vision
/* GET home page. */
router.get('/', async function (req, res, next) {
    console.log(path.resolve("/imagenes/prueba.jpeg"));
    const respuesta = await detectarInfo(path.resolve("/imagenes/prueba.jpeg")); //aqui mando la imagen a la funcion detectar info 
    res.json({ "prueba": respuesta });
});

module.exports = router;
