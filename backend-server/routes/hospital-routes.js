var express = require('express');
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();
var Hospital = require('../models/hospital');
const usuario = require('../models/usuario');


/** GET ALL*/
app.get('/', (req, res) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Hospital.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .exec(( error, hospitales ) => {
            if( error ){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar hospitales',
                    errors: error
                });
            }

            Hospital.count({}, (error, conteo) => {
                res.status(200).json({
                    ok: true,
                    hospitales: hospitales,
                    total: conteo
                });
            });
    });
});

/** POST */
app.post('/', mdAutenticacion.verificarToken, (req, res) => {
    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        img: body.img,
        usuario: body.usuario
    });

    hospital.save( (error, hospGuardado ) => {
        if(error) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear hospital',
                errors: error
            });
        }

        res.status(200).json({
            ok: true,
            hospital: hospGuardado
        });
    });
});

/** PUT */
app.put('/:id', mdAutenticacion.verificarToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (error, hospital) => {

        if(error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar hospital',
                errors: error
            });
        }

        if(!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital no se encontró',
                errors: error
            });
        }

        hospital.nombre = body.nombre;
        hospital.img = body.img;
        hospital.usuario = body.usuario;

        hospital.save( (error, hospitalEditado ) => {

            if(error){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar hospital',
                    errors: error
                });
            }

            res.status(200).json({
                ok: true,
                hospital: hospitalEditado,
                usuarioToken: req.usuario
            });
        });
    });
});

/** DELETE */
app.delete('/:id', ( req, res ) => {
    var id = req.params.id;

    Hospital.findByIdAndRemove(id, (error, hospital) => {
        if(error){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: error
            });
        }

        if(!hospital){
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital no se encontro',
                errors: error
            });
        }

        return res.status(200).json({
            ok: true,
            hospital: hospital,
            usuarioToken: req.usuario
        });
    });
});

module.exports = app;