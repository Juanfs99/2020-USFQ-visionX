/* CONTROLADORES PARA LA COLECCION LOCATIONS */
//const request = require('request');
const axios = require('axios');
const fs = require('fs');
import environment from '#root/ayudantes/environment';
const path = require('path');
const apiOptions = {
    server: 'http://localhost:' + environment('PORT')
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://visionx2.herokuapp.com';
};
/* GET HomePage */
const homeList = (req, res) => {

    axios.get(`/api/objects/${req.params.objectid}`)
        .then(function (response) {
            // handle success
            renderHomePage(req, res, response);
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });


};
const renderHomePage = (req, res, objetoResultante) => {
    res.render('index', {
        label: objetoResultante.label,
        sound: objetoResultante.sound,
    })
};

const homePage = (req, res) => {
    res.render('index', {
        V1: 'Titulo',
        V2: 'descubrir el mundo',
        V3: 'Somos una compañia independiente que queremos ayudar a las personas con poca o sin visión a que puedan saber que hay en el mundo como nosotros sabemos.',
        Caract: 'Fácil, útil y beneficioso',
        Descrip: 'VisionX es una herramienta web que activa la cámara de tu dispositivo para reconocer lo que tienes alfrente y tu celular te lo dirá.',

    })
};
/* GET Funcionamiento */
const funcionamiento = (req, res) => {
    res.render('funcionamiento', {
        title: 'Como funcionamos con los objetos registrados!',
        Objetos: 'Objetos registrados en VisionX',
        Oficina: 'Oficina',
        Casa: 'Casa',
        Escuela: 'Escuela',
        Calle: 'Calle',
        Escritorio: 'Escritorio',
        Cama: 'Cama',
        Carro: 'Carro',
        Lampara: 'Lámpara',
        Lavadora: 'Lavadora',
        Lapiz: 'Lápiz',
        Semaforo: 'Semáforo',
        Computadora: 'Computadora',
        Microondas: 'Microondas',
        Papel: 'Papel',
        Basurero: 'Basurero',
        Impresora: 'Impresora',
        Silla: 'Silla',
        Cartuchera: 'Cartuchera',
        Motocicleta: 'Motocicleta',
    })

};

const addObjeto = (req, res) => {
    res.render('new_object', {
        title: '¿Crear un nuevo Objeto?',
    })
};
const doAddObjeto = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) { //ESTO ES PARA SUBIR ARCHIVOS
        return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.sound;
    var dir = path.resolve('uploads'); //ESTO ES PARA HACER LA CARPETA PARA LOS AUDIOS
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    file.mv(path.resolve(dir, file.name));
    const apiPath = '/api/addobject';

    axios.post(`${apiOptions.server}${apiPath}`, {
        label: req.body.label,
        sound: path.resolve(dir, file.name),
    })
        .then(function (response) {
            console.log(response);
            res.render('new_object', {

                mensaje: 'Objeto creado Exitosamente'
            })
        })
        .catch(function (error) {
            console.log(error);
            res.render('new_object', {
                title: 'Crear un nuevo Objeto',
                mensaje: 'Llenar todos los campos'
            })
        });

};


/* CODIGO PARA ACTUALIZAR OBJETO*/
const changeObject = (req, res) => {
    res.render('update', {
        title: "Actualizar objeto",
        label: "",
        sound: ""
    })
};
const objectRead = (req, res) => {
    res.redirect(`/changeObject/${req.body.objectid}`);
};

const updateObject = (req, res) => {
    const path = `/api/objects/${req.params.objectid}`;

    axios.get(`${apiOptions.server}${path}`)
        .then(function (response) {
            // handle success
            //changeObject(req, res, response);
            console.log(response.data.label);
            res.render('update', {
                title: "Actualizar Objeto",
                label: response.data.label,
                sound: response.data.sound
            })

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

}
const doUpdateObject = (req, res) => {
    const path = `/api/objects`;
    const putdata = {
        label: req.body.label,
        sound: req.body.sound
    };

    axios.put(`${apiOptions.server}${path}/${req.params.objectid}`, {
        label: req.body.label,
        sound: req.body.sound,
    })
        .then(function (response) {
            console.log(response);
            res.render('update', {
                title: "Objeto actualizado",
                mensaje: "Ingresar otro objeto para actualizar",
                label: "",
                sound: ""
            })
        })
        .catch(function (error) {
            console.log(error);
            res.render('update', {

            })
        });

}

/* CODIGO PARA DELETEAR OBJETO*/
const deletearObject = (req, res) => {
    res.render('delete', {
        title: "Eliminar Objeto",
        label: "",
        sound: ""
    })
};
const objectDeleteRead = (req, res) => {
    res.redirect(`/deleteObject/${req.body.objectid}`);
};

const deleteObject = (req, res) => {
    const path = `/api/objects/${req.params.objectid}`;

    axios.get(`${apiOptions.server}${path}`)
        .then(function (response) {
            // handle success
            //deletearObject(req, res, response);
            console.log(response.data.label);
            res.render('delete', {
                label: response.data.label,
                sound: response.data.sound
            })

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

}
const doDeleteObject = async (req, res) => {
    const path_buscar = `/api/objects/${req.params.objectid}`;

    await axios.get(`${apiOptions.server}${path_buscar}`) //esto es para buscar dentro del delete para poder borrar el archivo antes de borrar el record en la base
        .then(function (response) {
            if (fs.existsSync(response.data.sound)) {
                fs.unlinkSync(response.data.sound);
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

    const path = `/api/objects`;

    axios.delete(`${apiOptions.server}${path}/${req.params.objectid}`)
        .then(function (response) {
            res.render('delete', {
                title: "Objeto Borrado",
                mensaje: "Ingresar otro id para borrar otro objeto",
                label: "",

            })
        })
        .catch(function (error) {
            console.log(error);
            res.render('delete', {

            })
        });

}




/* GET LocationReview */
const addReview = (req, res) => {
    res.render('calificanos', { title: '¿Qué dice la gente de nosotros?' })
};
const usersController = (req, res) => {
    res.send('respond with a resource USERS');
};

/*GET VISION HERRAMIENTA*/
const visionTool = (req, res) => {
    res.render('vision', { title: 'VisionX' })
};

module.exports = {
    homeList,
    homePage,
    renderHomePage,
    usersController,
    funcionamiento,
    addReview,
    addObjeto,
    doAddObjeto,
    changeObject,
    objectRead,
    updateObject,
    doUpdateObject,
    deletearObject,
    objectDeleteRead,
    deleteObject,
    doDeleteObject,
    visionTool
};
