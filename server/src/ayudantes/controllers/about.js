/*CONTROLADOR DE ABOUT*/ 
/*GET ABOUT */
const about= (req, res) => {
    res.render('about', { title: '¿Quiénes somos?',
    Mision: 'Misión',
    Vision: 'Visión',
    ContentM: 'Somos una compañía independiente que queremos ayudar a las personas con poca o sin visión a que puedan saber que hay en el mundo como nosotros sabemos.',
    ContentV: 'Somos una compañía independiente que queremos ayudar a las personas con poca o sin visión a que puedan saber que hay en el mundo como nosotros sabemos.',

})
};

module.exports={
    about
}