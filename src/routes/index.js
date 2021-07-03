// ------- Rutas --------/
/*app.get('/', (req, res) => {    // tendran el mensaje 'Hello World' cuando visiten la ruta inical de la app
    res.send('Hello World');
})*/

const {Router} = require('express') // desde express se requiere el método Router
const router = Router();    // se crea constante router para ejecutar el método

router.get('/test', (req,res) => { // Se define como un enrutador 
    const data = {  // se crea objeto data
        "name": "Sergio",
        "website": "cunati.com"
    };
    
    res.json({data});   // responderá con un objeto .JSON
})

// Se exportan las rutas
module.exports = router;