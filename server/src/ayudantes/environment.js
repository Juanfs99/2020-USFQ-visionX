if (process.env.NODE_ENV == 'development') { //si esque estoy en development importa el modulo .env, en .env estan todas las credenciales y cosas importantes.
    require('dotenv').config()
}
const cache = {};

const environment = (key, defaultValue) => {

    // Si no hay key en process.env
    if (!(key in process.env)) {

        // si hay valor default devuelvo default
        if (defaultValue) { return defaultValue };

        // si no hay default ni existe en process.env genero error
        throw new Error(`${key} not found in process.env !`);
    }

    // Si esta en cache devuelvo cache
    if (cache[key]) { return cache[key] };

    // Asigno a cache por primera vez
    cache[key] = process.env[key];
    return cache[key];

};

export default environment;