var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require('fs');
import detectarInfo from '#api/ayudantes/googleVisionHelper'; //aqui importo la funcion detectarInfo desde el archivo ayudantes/vision
import { fstat } from 'fs';


const labelGet = async (req, res) => { //Controlador de la ruta vision, que es para hacer las cosas
    const file = req.body.imagen64; //es la imagen que mandamos desde el ajax en base 64
    const base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, ''); //regular expresion para eliminar el inicio de la imagen en base64 porque es como llega encriptada, es la descripcion de la imagen 
    var dir = path.resolve('tmp'); //ESTO ES PARA HACER LA CARPETA PARA LOS AUDIOS
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const buffer = new Buffer(base64Data, "base64"); //Buffer es una cosa que recibe toda la informacion de texto y la acumula en un objeto para poder utilizarla despues en lo que queramos y lo de base64 es para explicar que tipo de informacion tiene el objeto que entra
    fs.writeFileSync(path.resolve(dir, "imagen.png"), buffer); //graba un archivo en disco duro, se le pone la ruta y el buffer que es la infromacion
    const respuesta = await detectarInfo(path.resolve(dir, "imagen.png")); //aqui mando la imagen a la funcion detectar info 
    res.json({ labels: respuesta }); //despues devolvemos a la informacion del Ajax 

}

module.exports = {
    labelGet
};
