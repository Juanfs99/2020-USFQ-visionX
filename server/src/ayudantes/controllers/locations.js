/* CONTROLADORES PARA LA COLECCION LOCATIONS */
//const request = require('request');
const axios = require('axios');
const apiOptions = {
    server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://visionx2.herokuapp.com';
};
/* GET HomePage */
const homeList = (req, res) => {
    /*const path =  `/api/objects/${req.params.userid}`;
    const requestOptions = { //Objeto cargado con las opciones
        url :  `${apiOptions.server}${path}`,
        method: 'GET',
        json : {},
        qs:{}
    };*/
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

    /*request( //Modulo request que usa la API REST
        requestOptions, //Opciones
        (err, response, body) =>{ //callback con sus 3 partes: err, response, body
            //error - objeto con el error
            //response - respuesta completa (incluye el status)
            //body  - cuerpo de la respuesta
            if(err){
                console.log(err);
            }else if(response.statusCode === 200 && body){ //ademas del statusCode, el objeto resultantte debe tener contenido
                console.log(body);
                renderHomePage(req, res, body);
            }else{
                console.log(response.statusCode);
                res.render('error', { //usar la vista error.pug
                    error: 'Error',
                    codigo: req.params.objectid,  //coudigo de usuario con error
                    mensaje: 'No existe. Ingrese uno valido'
                });
            }
            
        }       
    );*/
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

    const path = '/api/addobject';

    axios.post(`${apiOptions.server}${path}`, {
        label: req.body.label,
        sound: req.body.sound,
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
const doDeleteObject = (req, res) => {
    const path = `/api/objects`;

    /*const requestOptions = {
        url: `${apiOptions.server}${path}/${req.params.objectid}`,
        method: 'PUT',
        json: putdata
 
    };*/
    axios.delete(`${apiOptions.server}${path}/${req.params.objectid}`, {
        label: req.body.label,
        sound: req.body.sound,
    })
        .then(function (response) {
            console.log(response);
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
    res.render('vision', { title: '¿Qué dice la gente de nosotros?' })
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
    visionTool,
};
