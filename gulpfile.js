/* TODO ESTE ARCHIVO ES UN ASISTENTE PARA HACER LAS DIFERENTES COSAS AL MOMENTO QUE MANDEMOS EL NPM RUN WATCH*/

const { src, dest, series, parallel } = require('gulp');
const concat = require('gulp-concat'); //para concatenar los css
const minify = require('gulp-babel-minify'); //es para minificar los js para que sean liviano todo el proyecto
const postcss = require('gulp-postcss'); //Es el task manager para la acción de los css
const autoprefixer = require('autoprefixer');//es para poner un prefijo en los css despues de minificar, es para saber en donde esta cada cosa del css de las paginas
const cssnano = require('cssnano'); //css nano es para minificar que pone todo en una sola linea para que pese menos
const replace = require('gulp-replace'); //nos ayuda a buscar dentro de nuestros archivos pug los querys para evitar cashing (los servidores guardan en memoria temporal los archivos que han servido a un cliente, para actualizar ) pone un id nuevo cada vez que se actualiza para que el servidor piense que es uno nuevo y no se quede la version antigua
const changed = require('gulp-changed'); //el change es para mirar si hay cambios dentro de una carpeta
const imagemin = require('gulp-imagemin') //despues de change si sabe si cambio es para optimizar imagenes para web sin perder calidad solo png jpg gif

//File Path, es para saber en donde esta todo
const files = {
    cssPath: ['assets/css/all.min.css', 'assets/css/style.css'], //esta un array para decir el orden del css 
    jsPath: 'assets/js/**/*.js', //Es para reconocer todos los archivos js, no importa como pero busca todos
    fonts: 'assets/webfonts/**/*', //ES para reconocer la carpeta de los webfonts
    views: 'server/views/**/*.pug', //Es para reconocer todos los archivos pug, no importa como pero busca todos
    images_raster: 'assets/images/**/*.+(png|jpg|gif)', //Es para reconocer todos los archivos png jpg gif, no importa como pero busca todos
    favicon: 'assets/favicon.ico',
    images_special: 'assets/images/**/*.+(svg)' //Es para reconocer todos los archivos svg, no importa como pero busca todos

}

function cssTask() {
    return src(files.cssPath)
        .pipe(concat('styles.css')) //pipe es para direccionar  ----concat es para concatenar todos los css en un solo archivo styles.css
        .pipe(postcss([autoprefixer(), cssnano()])) //despues que esta listo le pone un post y dentro de eso con el autoprefixer indexa de que es cada css y despues manda al cssnano que lo minifica todo para que pese menos 
        .pipe(dest('public/css') //esto es para grabar el archivo en donde digamos, en este caso en public css
        );
}

function jsTask() {
    return src([files.jsPath])
        .pipe(minify()) //para minificar los js para que sean mas livianos para el proyecto
        .pipe(dest('public/js') //esto es en donde los guardamos
        );
}

function cacheBustTask() { //es el task que pone los numeros despues de los pug para que reconozca cada vez los ultimos y no los antiguos
    var mmString = new Date().getTime();
    return src([files.views]) //agarramos todos lo archivos de views
        .pipe(replace(/mm=\d+/g, 'mm=' + mmString)) //es para reemplazar lo que encuentre /mm=\d+/g y eso lo reemplaze con 'mm=' + mmString
        .pipe(dest('dist-server/views')); //despues es donde lo guarda en la carpeta dist-server
}

function optimazeImageTask() {
    return src([files.images_raster]) //agarrar las imagenes raster del asset
        .pipe(changed('public/images')) //te compara las imagenes con public para saber cuales estan nuevas o no, si alguna es diferente las minimiza
        //.pipe(imagemin()) //despues la minifica, optimizacion de las imagenes
        .pipe(dest('public/images')); //despues guarda en el archivo 
}


function copyImageTask() {
    return src([files.images_special]) //busca las imagenes svg de la carpeta assets
        .pipe(dest('public/images')); //despues las copia porque no se pueden cambiar
}
function copyFavicon() {
    return src([files.favicon]) //busca las imagenes svg de la carpeta assets
        .pipe(dest('public')); //despues las copia porque no se pueden cambiar
}
function copyFonts() {
    return src([files.fonts]) //busca las imagenes svg de la carpeta assets
        .pipe(dest('public/webfonts')); //despues las copia porque no se pueden cambiar
}

exports.default = series( //el series explica como exportar en orden que mandemos los tasks
    parallel(cssTask, jsTask),  //es para mandar a la vez los dos porque no tienen dependencias uno a otro. 
    cacheBustTask,
    optimazeImageTask,
    copyImageTask,
    copyFonts,
    copyFavicon
);