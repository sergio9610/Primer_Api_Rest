// Se requieren los módulos express y morgan que simulan un servidor

const express = require('express');
const app = express();
const morgan = require('morgan'); // morgan procesa datos antes de que el servidor los reciba
const route = require('./routes/index');
const route_music = require('./routes/music-album');

// ------ Configuraciones ------ //
// process.env.PORT -> en caso exista un puerto definido en el sistema o servicio de la nube
// lo toma, si no existe, que tome el puerto 3000 
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// ------ Middlewares ----- //
app.use(morgan('dev')); // permite ver por consola lo que le va llegando al servidor
app.use(express.urlencoded({extended: false})); // trata de entender los datos que llegan desde formularios(inputs)
app.use(express.json()); // permite al servidor recibir formatos JSON y entenderlos

// ----- Rutas ----- //
app.use(route);
app.use('/api/music-album', route_music);

// ----- Empezando el servidor ----- //
app.listen(app.get('port'), () => {    //escucha en el puerto 2000
    console.log(`Server on port ${app.get('port')}`);
});