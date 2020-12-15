const path = require("path");
const vision = require("@google-cloud/vision");
import environment from "#root/ayudantes/environment";
const key = path.resolve(environment("GOOGLE_APPLICATION_CREDENTIALS")); //path.resolve es que agarra la carpeta y busca la direccion de eso. busca cual es la mejor solucion para llegar a eso.
const pid = environment("GCLOUD_PID");
const client = new vision.ImageAnnotatorClient({ //este es el que me ayuda a conectarme a la nube. Y el que me ayuda a procesar la imagen queu voy a mandar. Es decir me devuelve la informacion.
    projectId: pid,
    keyFilename: key
})

function detectarInfo(imagenUbicacion) { //esta funcion es la que manda la ubicacion de la imagen al cliente de googleCloud
    return client.labelDetection(imagenUbicacion) //Promesas  espera una respuesta, cuando recibe una respuesta ejecuta el .then  o el catch(asyncronouns function)
        .then( //es cuando es correcto
            (respuesta) => {
                if (respuesta[0] === undefined) {
                    return false;
                }
                else {
                    return respuesta[0].labelAnnotations;
                }
            }
        )
        .catch( //esto es cuando hay un error
            (error) => {
                console.log(error);
                return false;
            }
        );
}

export default detectarInfo;