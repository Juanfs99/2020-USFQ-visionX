const express = require('express');
const router = express.Router();
//incluir mis controladores
const ctrlObjects = require('#api/controllers/objects');
const ctrlVision = require('#api/controllers/vision');
//definir las rutas para las acciones sobre la coleccion users

router
    .route('/objects')
    .post(ctrlObjects.objectCreateMultiple)
    .get(ctrlObjects.objectList);

router
    .route('/objects/:objectid')
    .get(ctrlObjects.objectRead)
    .put(ctrlObjects.objectUpdate)
    .delete(ctrlObjects.objectDelete);
router
    .route('/addobject')
    .post(ctrlObjects.objectCreate)
    .get(ctrlObjects.objectList);
router
    .route('/search/:label')
    .get(ctrlObjects.objectName)
router
    .route('/vision')
    .post(ctrlVision.labelGet)



module.exports = router;