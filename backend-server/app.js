// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express(); //defino servidor express

/** CORS  */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS"); 
    next();
  });


//Body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Importar rutas
var appRoutes = require('./routes/app-routes');
var usuarioRoutes = require('./routes/usuario-routes');
var loginRoutes = require('./routes/login-routes');
var hospitalRoutes = require('./routes/hospital-routes');
var medicoRoutes = require('./routes/medico-routes');
var busquedaRoutes = require('./routes/busqueda-routes');
var uploadRoutes = require('./routes/upload-routes');
var getImgRoutes = require('./routes/getImagenes-routes');

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (error, resp) => {
    if(error) throw error;
    
    console.log('Base de datos: \x1b[32m%s\x1b[0m' , 'online');
});

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', getImgRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3001, () => {
    console.log('express server corriendo en el puerto 3001: \x1b[32m%s\x1b[0m' , 'online');
});