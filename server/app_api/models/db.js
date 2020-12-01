const mongoose = require('mongoose');
const readline = require('readline');
import environment from "#root/ayudantes/environment";
require('./esquema1');


let dbURI = environment("MONGODB_URI"); //saca desde el .env las claves
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_URI;
    console.log("hello:" + dbURI);
}
mongoose.connect(dbURI, { useNewUrlParser: true });

//Escucha evento SIGNINT
if (process.platform === 'win32') {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.on('SIGINT', () => {
        process.emit("SIGINT");
    });
};

//Funcion de cerrar conexion
const proShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose se cerro debido a: ${msg}`);
        callback();
    })
};

// windows: SINGINT
process.on('SIGINT', () => {
    proShutdown('terminacion de windows', () => {
        process.exit(0);
    });
});

//node: SIGUSR2
process.once('SIGUSR2', () => {
    proShutdown('nodemon reinicio', () => {
        process.kill(process.pid, 'SIGUSR2');
    })
});

// heroku: SIGTERM
process.on('SIGTERM', () => {
    proShutdown('heroku shutdown', () => {
        process.exit(0);
    })
});


//------MONITOREO EVENTOS DE CONEXION DB1--------
//Conexion Mongoose
mongoose.connection.on('connected', () => {
    console.log(`Mongoose se conecto a: ${dbURI}`);
});

//Error de conexion
mongoose.connection.on('error', err => {
    console.log("Mongoose error de conexion:", err);
});

//Desconexion
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose DB1 esta desconectado');
});