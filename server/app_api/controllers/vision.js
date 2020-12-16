var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require('fs');
import detectarInfo from '#api/ayudantes/googleVisionHelper'; //aqui importo la funcion detectarInfo desde el archivo ayudantes/vision
//Incorporar modelo compilado en Mongoose 
const mongoose = require('mongoose');
const objetos = mongoose.model('objeto');


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

    const objs = await objetos.find({}).select('label sound _id');

    let candidato = null; //creamos variable candidato en donde se va a guardar la respuesta final
    let visionCandidato = null; //para guardar la informacion del label clasificado del Google Vision, el valor es igual al objeto que tenemos en la base
    objs.forEach(obj => { //un for loop para analizar cada uno de los objetos en la base de datos La variable obj es que contiene cada objeto
        console.log("Analizando objeto:" + obj.label);
        if (visionCandidato == null) { //si el objeto seleccionado es null vision candidato
            visionCandidato = respuesta.find(visionLabel => { //hacemos un find y buscamos dentro de respuesta si esque el objeto  label (visionLabel es un metodo)
                const description = visionLabel.description.toLowerCase();
                console.log("GoogleVision:" + description);
                //EL IF ES LA CONDICION DEL FIND PARA SABER COMO BUSCA ALGO
                if (description.indexOf(obj.label.toLowerCase()) > -1) { //El valor de el label.description de google Vision contenga la palabra del obj.label de mi base de datos
                    console.log("ENCONTRADO");
                    return true; //le asigna a visionCandidato el label correspondiente HACE QUE VISIONCANDIDATO SEA IGUAL A VISIONLABEL
                }
            })
            if (visionCandidato != null) { //Si esque visionCandidato ya no es null
                console.log(path.parse(obj.sound));
                const filename = path.parse(obj.sound).base; //Coge un path a un archivo y da todas las partes de un archivo (parse)

                candidato = {//aqui es para asignar solo el label al obj para que me imprima solo label para que se imprima el label y no toda la info
                    label: obj.label,
                    url: '/uploads/' + filename
                }
            }
        }

    });

    if (candidato == null) {
        candidato = { label: 'No encontrado', url: 'ninguno.mp3' }; //aqui decimos que si el candidato no tiene informacion no se refiere a nada en la base le direccionamos el audio ninguno que esta en public
    }

    res.json(candidato); //despues devolvemos a la informacion del Ajax 

}

module.exports = {
    labelGet
};
