
var express = require('express');

var app = express();

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');

/** Busqueda en todo */
app.get('/todo/:data', (req, res, next) => {
    
    var busqueda = req.params.data;
    var expresionRegular = new RegExp( busqueda, 'i')


    Promise.all( [buscarHospitales(expresionRegular), 
                buscarMedicos(expresionRegular),
                buscarUsuarios(expresionRegular)])
            .then( respuestas => {
                res.status(200).json({
                    ok: true,
                    hospitales: respuestas[0],
                    medicos: respuestas[1],
                    usuarios: respuestas[2]
                });
            });
});

/** Busqueda por coleccion */
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var tabla = req.params.tabla;
    var busqueda = req.params.busqueda;

    var expReg = new RegExp( busqueda, 'i');

    var promesa;

    switch(tabla){
        case 'usuarios':
            promesa = buscarUsuarios(expReg);
            break;

        case 'hospitales':
            promesa = buscarHospitales(expReg);
            break;

        case 'medicos':
            promesa = buscarMedicos(expReg);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe la tabla indicada'
            });
    }

    promesa.then( resultado => {
        res.status(200).json({
            ok: true,
            [tabla]: resultado
        });
    });
});

function buscarHospitales( expReg ) {

    return new Promise((resolve, reject) => {
        Hospital.find({nombre: expReg})
            .populate('usuario', 'nombre email')
            .exec((error, hospitales) => {
        
            if(error) {
                reject('Error al cargar hospitales');
            }
            else {
                resolve(hospitales);
            }
        });
    });
}

function buscarMedicos( expReg ) {

    return new Promise((resolve, reject) => {
        Medico.find({nombre: expReg})
            .populate('usuario', 'nombre email')
            .populate('hospital')
            .exec((error, medicos) => {
        
            if(error) {
                reject('Error al cargar medicos');
            }
            else {
                resolve(medicos);
            }
        });
    });
}

function buscarUsuarios( expReg ) {

    return new Promise((resolve, reject) => {
        
        Usuario.find({}, 'nombre email role')
                .or( [ {nombre: expReg }, {email: expReg}] )
                .exec((error, usuarios) => {
                    if(error){
                        reject('Error al cargar usuarios');
                    }
                    else{
                        resolve(usuarios);
                    }
                });
    });
}

module.exports = app;