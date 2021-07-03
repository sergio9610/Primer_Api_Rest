
const {Router} = require('express') // desde express se requiere el método Router
const router = Router();    // se crea constante router para ejecutar el método

const musicAlbum = require('./sample.json');    // guardo en musicAlbum el archivo sample.json que contiene los álbumes

const _ = require('underscore');

// ----- Obtención de datos a partir del método get ----- //
router.get('/', (req, res) => {
    res.json(musicAlbum);   // se le muestran los álbumes a la aplicación cliente
});

// ----- Creación de datos a partir del método post ----- //
router.post('/', (req, res) => {
    const {album, gender, release, duration, discography, productor, recorded} = req.body;
    // se comprueba que se reciban los datos
    if(album && gender && release && duration && discography && productor && recorded) {
        const id = musicAlbum.length + 1; // generación de id
        const newAlbum = {...req.body, id}; // se le pasa al objeto newAlbum todo lo que contiene el body que ingresa el cliente
        //console.log(newAlbum);    // muestra por consola el nuevo dato que se desea almacenar
        musicAlbum.push(newAlbum);  // el método push inserta y guarda un nuevo dato en musicAlbum
        res.json(musicAlbum);   //se le envía los álbumes agregados y los ya existentes a las aplicaciones cliente

    }
    else {
        res.status(500).json({error: 'There was an errror.'});   // status(500) -> el servidor tuvo un error al momento de procesar el dato
    }
    
});

// ----- Actualización de dato a partir del método put ----- //
router.put('/:id', (req, res) => {  // se debe especificar en a ruta el id que será afectado
    const {id} = req.params;    // obtención del id 
    const {album, gender, release, duration, discography, productor, recorded, format} = req.body;  //
    if(album && gender && release && duration && discography && productor && recorded) {    // se verifica que existan todos los campos que contienen los álbumes
        _.each(musicAlbum, (albumModify, i) => {    // each recorre el arreglo
            // se verifica el id para luego recorrer cada campo y actualizarlo por lo ingresado por el cliente 
            if(albumModify.id == id) {  
                albumModify.album = album;
                albumModify.gender = gender;
                albumModify.release = release;
                albumModify.duration = duration;
                albumModify.discography = discography;
                albumModify.productor = productor;
                albumModify.recorded = recorded;
                albumModify.format = format;
            }
        });
    
        res.json(musicAlbum);   //se le envía los álbumes actualizados y los ya existentes a las aplicaciones cliente
        console.log(id);    // se verifica en consola el id que fue actualizado
    }
    else {
        res.status(500).json({error: 'There was an error.'});   // status(500) -> el servidor tuvo un error al momento de procesar el dato
    }
});

// ----- Borrar un dato a partir del método delete ----- //
router.delete('/:id', (req, res) => {   // se debe especificar en a ruta el id que será afectado
    const {id} = req.params;  // req.params da toda la información de los parámetros
    _.each(musicAlbum, (album, i) => {  // each recorre el arreglo
        if(album.id == id) {
            musicAlbum.splice(i, 1);    // se remueve el álbum con splice
        }
    })    
    res.send(musicAlbum);   // muestra en la aplicación cliente los álbumes que permanecieron
});

module.exports = router;