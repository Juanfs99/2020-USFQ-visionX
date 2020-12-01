$(document).ready(function () {
    //Encontrar instancia del boton de upload
    var inputSound = $('#sound'); //busca un id Sound
    var label = $('#soundLabel'); //busca un id soundLabel
    var labelInfo = label.html(); //para seleccionar el elemento label.
    console.log(inputSound);
    if (inputSound && label) { //si esque inputSound y label estan presentes pasa lo siguiente
        inputSound.on('change', function (event) { //Si esque inputSound cambia pasa la funcion, si agregas un archivo
            var fileName = ''; // Es para despues para poner el nombre del archivo
            var filenameArr = event.target.value.replace(/\\/g, "/").split('/'); //cuando recibe el archivo esto sirve para reemplazar los slahes ene l caso de mac o pc, depues los hace un arreglo con split y con pop() agarrra el utlimo elemento del array para mostrarlo en filename
            fileName = filenameArr.pop();
            filenameArr = fileName.split('.'); //rompe el nombre del archivo despues del punto que es la extension y hace un array
            var ext = filenameArr.pop().toLowerCase(); //esto es para agarrar la extension con el .pop que agarra el ultimo item de un array y en este caso la extension
            //pop se apropia del ultimo elemento, y lo borra del array original
            if (fileName && fileName.split('.').length > 1 && ext == "mp3") { //si esque filename existe el label cambia 
                if (fileName.length > 10) {
                    label.html(filenameArr.join(".").substring(0, 8) + '....' + ext);
                }
                else {
                    label.html(fileName);
                }
            } else {
                label.html('<span class="error">Formato no valido</span>'); //si esque no no pasa nada
                //onsole.log(event.tar)
                event.target.value = null; //si esque el valor no es el que quiero lo borro con false
            }
        });

    };
});