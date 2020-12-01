//Incorporar modelo compilado en Mongoose 
const mongoose = require('mongoose');
const objetos = mongoose.model('objeto');

//Controladores
//Crear multiples documentos al mismo tiempo
const objectCreateMultiple = (req, res) => {
    const objs = req.body.objetos;
    console.log(objs);
    objetos.insertMany(objs, (err, objetosUsuario) => {
        if (err) {
            res
                .status(400)
                .json(err);
            return;
        } else {
            res
                .status(200)
                .json(objetosUsuario);
        }
    });
}
//Crear un nuevo documento

const objectCreate = (req, res) => {
    //Grabar el archivo en una carpeta del servidor
    console.log(req.body.label);
    console.log(req.body.sound);

    objetos.create({
        label: req.body.label,
        sound: req.body.sound
    }, (err, objetoUsuario) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(200)
                .json(objetoUsuario);
        }
    });

};

const objectList = (req, res) => {
    objetos
        .find({

        }) //obtiene todos los datos de la coleccion
        .select('label sound -_id')
        .exec((err, objetosUsuario) => {
            if (!objetosUsuario) {  //no existe el documentos en la coleccion
                console.log(`No existen documentos en la coleccion ${objetos} no encontrado`);
                return res
                    .status(404)
                    .json({
                        "mensaje": "Objeto no encontrado"
                    });
            } else if (err) { //find encontro un error
                console.log(`Se encontro un error en la coleccion: ${objetos}`);
                return res
                    .status(404)
                    .json(err);
            }
            res // responder enviando el documento encontrado y el status HTTP 200
                .status(200)
                .json(objetosUsuario);
        })
};
// Buscar un documento con userid
const objectRead = (req, res) => {
    objetos
        .findById(req.params.objectid) //obtiene el userId de los parametros de la URL
        .exec((err, objetoUsuario) => {
            if (!objetoUsuario) {  //no existe el documento con userid
                console.log(`Objeto con objectid: ${req.params.objectid} no encontrado`);
                return res
                    .status(404)
                    .json({
                        "mensaje": "Objeto no encontrado"
                    });
            } else if (err) { //findbyid encontro un error
                console.log(`Se encontro un error para el objectid: ${req.params.objectid}`);
                return res
                    .status(404)
                    .json(err);
            }
            res // responder enviando el documento encontrado y el status HTTP 200
                .status(200)
                .json(objetoUsuario);
        })

};

const objectUpdate = (req, res) => {
    if (!req.params.objectid) {
        return res
            .status(404)
            .json({ "Mensaje": "Usuario no encontrado, ingrese un userid" });
    }
    objetos
        .findById(req.params.objectid)
        .exec((err, objetoUsuario) => {
            if (!objetoUsuario) {
                return res
                    .status(404)
                    .json({ "Mensaje": "userid no existe" });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            /*//objetoUsuario.nombre = req.body.nombre; // Modificar solo el path nombre
            //objetoUsuario.apellido = req.body.apellido;
            objetoUsuario.direccion = req.body.direccion;
            objetoUsuario.edad = req.body.edad;
            objetoUsuario.telefono = req.body.telefono;
            objetoUsuario.materias.tipo = req.body.tipo;
            objetoUsuario.materias.nombres = [req.body.nombres];*/
            objetoUsuario.label = req.body.label;
            objetoUsuario.sound = req.body.sound;

            objetoUsuario.save((err, Objeto) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(Objeto);
                }
            });
        });
};

const objectDelete = (req, res) => {
    if (req.body.objectid) {
        objetos
            .findByIdAndDelete(req.body.objectid)
            .exec((err, objetoUsuario) => {
                if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                if (!objetoUsuario) {
                    res
                        .status(404)
                        .json(null);
                } else {
                    res
                        .status(204)
                        .json(null);
                }
            });
    } else {
        res
            .status(404)
            .json({ "mensaje": "No se encontró el usuario" });
    }
};

module.exports = {
    objectCreateMultiple,
    objectCreate,
    objectList,
    objectRead,
    objectUpdate,
    objectDelete
};