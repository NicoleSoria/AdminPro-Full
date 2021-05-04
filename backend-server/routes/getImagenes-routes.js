var express = require('express');

var app = express();
const path = require('path');
const fs = require('fs');


var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');

// Rutas
app.get('/:tabla/:img', (req, res, next) => {

    var tabla = req.params.tabla;
    var img = req.params.img;

    var pathImagen = path.resolve( __dirname, `../uploads/${tabla}/${img}` );

    if(fs.existsSync(pathImagen)){
        res.sendFile( pathImagen );
    }
    else {
        var pathNoImagen = path.resolve( __dirname, '../assets/no-img.jpg');
        res.sendFile( pathNoImagen );
    }
});

module.exports = app;