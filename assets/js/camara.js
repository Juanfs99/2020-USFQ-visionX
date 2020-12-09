$(document).ready(function () {
    var width = 720; //primero seteamos el tamaño que queremos que sea
    var height = 0; //esto manda la camara 
    var fotoBtn = null; //esto es para el boton
    var video = null; //componente de video
    var canvas = null; //el canvas donde se va a dibujar la foto es un elemento que sirve para coger pixeles de un lugar y dibjarlo en el canvas
    var streaming = false; //es para saber si la camara esta funcionado
    var output = null; //Es el modal la pantalla que aparece al momento de tomar la foto, el contenedor en donde esta el canvas que muestra la foto y 
    var closeModal = null; //el boton para cerrar

    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    fotoBtn = document.getElementById('cheese');
    output = document.getElementById('output');
    closeModal = document.getElementById('closeModal');


    var limpiarCanvas = function () { //esta funcion es para que se limpie el canvas para que no se sobrepongan las fotos
        var context = canvas.getContext('2d'); //cuando se usa canvas siempre se debe saber el contexto, se sabe el contexto si es en 2d .getContext
        context.fillStyle = "#FFF"; //Esto es para llenar el canvas
        context.fillRect(0, 0, canvas.width, canvas.height); //le hacemos un rectangulo del tamaño del canvas

    }

    var tomarFoto = function () { //es para tomar la foto
        var context = canvas.getContext('2d'); //cogemos el contexto del canvas
        if (width && height) { //si esque width y height estan seteados y existen. si esque height es 0 no pasa lo de adentro, eso depende si esque esta la camara o no 
            canvas.width = width;
            canvas.height = height;
            output.style.width = '100%'; //esto es para poner el modal al 100%
            output.style.height = '100%';
            context.drawImage(video, 0, 0, width, height); //luego dibujamos los pixeles del momento que se tome en ese momento ene le video
            var data = canvas.toDataURL('image/png');
            llamarServicio(data);
        } else {
            limpiarCanvas(); //esto pasa si sifue en 0 el height
        }
    }

    var llamarServicio = function (data) { //es un llamado al API con ajax a vision
        $.ajax({ //ajax es como el axios pero para frontend 
            type: "POST",
            url: "/api/vision",
            data: {
                imagen64: data //mandamos en data la imagen encriptada como base 64--SON LOS PIXELES DE UNA IMAGEN ENCRIPTADA EN TEXTO---
            }
        })
            .done(function (res) { //Cuando recibimos la informacion res es el objeto del ajax
                console.log(res);
            });
    }



    navigator.mediaDevices.getUserMedia({ video: true, audio: false }) //esto es para saber si esque hay la camara, hace un request a ver si esta la camara conectada
        .then(function (stream) { //si esque esta la camara conectada  pasa lo de adentro
            video.srcObject = stream; //el componente de video con su propiedad srcObject es donde asigno el stream de la webcam
            video.play(); //y despues solo se hace play al componente de video
        })
        .catch(function (err) { //si esque hay un error pasa esto
            console.log("Ocurrió un error inicializando cámara: " + err);
        });

    video.addEventListener('canplay', function (event) { //al componente de video se le puede agregar una propiedad addEventListener el canplay es un evento que dice qie si pede hacer play
        if (!streaming) { //si esque es la primera vez que incializas la camara 
            height = video.videoHeight / (video.videoWidth / width); //se setea el height que servirá para los de tomar foto para que sea posible

            video.setAttribute('width', width); //se setean los atributos de los eventos con la informacion de la camara
            video.setAttribute('height', height); //se setean los atributos de los eventos con la informacion de la camara
            canvas.setAttribute('width', width); //se setean los atributos de los eventos con la informacion de la camara
            canvas.setAttribute('height', height); //se setean los atributos de los eventos con la informacion de la camara
            streaming = true; //true porque ya tenemos la info y si volvemos a ingresar ya no sucedera todo lo de arriba porque ya es true a menos de que se haga un refresh y tenga que pasar el proceso de nuevo
        }
    }, false);

    fotoBtn.addEventListener('click', function (event) {
        event.preventDefault(); //se les pone a los botones para que evite el url (previene el comportamento default del atriubito)
        tomarFoto();      //ejecuta el codigo de tomar foto
    }, false);

    closeModal.addEventListener('click', function (event) { //es para cerrar el modal
        event.preventDefault();
        output.style.width = '1px'; //se le pone 1px al principio para simular que se cerro
        output.style.height = '1px';
    }, false)

    limpiarCanvas();
});