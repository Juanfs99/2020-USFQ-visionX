const mongoose = require('mongoose');

const objetosSchema = new  mongoose.Schema({ //definicion del esquema
    label: {
        type: String,
        required: true,
        
    },
    sound: {
        type: String,
        required: true, 
    } 
    
});

const Diccionario= new mongoose.model('objeto', objetosSchema); //compilar el esquema en el modelo
/*const objeto = new Diccionario({
    label: 'example',
    sound: '/sounds/example.mp3'
}); //crear el documento

objeto.save(); //guarda en DB*/