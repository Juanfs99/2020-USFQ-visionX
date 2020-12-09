var express = require('express');
var router = express.Router();
const ctrlLocations = require('#root/ayudantes/controllers/locations');
const ctrlAbout = require('#root/ayudantes/controllers/about');


/* GET home page. */
/*router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
*/


/* DEFINIR LAS RUTAS DE MIS PAGINAS*/

/* GET home page. */
router.get('/', ctrlLocations.homePage);
/* GET home page users. */
router.get('/objects/:objectid', ctrlLocations.homeList);
/* GET funcionamiento. */
router.get('/funcionamiento', ctrlLocations.funcionamiento);
/* GET Locations Review. */
router.get('/calificanos', ctrlLocations.addReview);
/* GET About. */
router.get('/about', ctrlAbout.about);
/* GET Creacion de  Objeto. */
router.get('/objects/new/add', ctrlLocations.addObjeto);

/* Post Add_object. */
router.post('/objects/new/add', ctrlLocations.doAddObjeto);

/*CHANGE OBJECT*/
router.get('/changeObject', ctrlLocations.changeObject);
router.post('/changeObject/', ctrlLocations.objectRead);

router.get('/changeObject/:objectid', ctrlLocations.updateObject);
router.post('/changeObject/:objectid', ctrlLocations.doUpdateObject);

/*DELETE OBJECT*/
router.get('/deleteObject', ctrlLocations.deletearObject);
router.post('/deleteObject/', ctrlLocations.objectDeleteRead);

router.get('/deleteObject/:objectid', ctrlLocations.deleteObject);
router.post('/deleteObject/:objectid', ctrlLocations.doDeleteObject);

/*Tool Vision*/

router.get('/visionTool', ctrlLocations.visionTool);

/* AUDIOS */
router.get('/sound/:objectid', ctrlLocations.soundGet)


module.exports = router;
