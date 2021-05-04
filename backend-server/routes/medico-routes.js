var express = require('express');
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();
var Medico = require('../models/medico');

/** GET ALL */
app.get('/', (req, res) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Medico.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('hospital', 'nombre')
        .exec((error, medicos) => {

            if(error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar medicos',
                    errors: error
                });
            }

            Medico.count({}, (error, conteo) => {
                res.status(200).json({
                    ok: true,
                    medicos: medicos,
                    total: conteo
                });
            });
        });
});

/** POST */
app.post('/', mdAutenticacion.verificarToken, (req, res) => {

    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        img: body.img,
        usuario: body.usuario,
        hospital: body.hospital
    });

    medico.save((error, medicoGuardado) => {
        if(error){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al cargar hospitales',
                errors: error
            });
        }

        res.status(200).json({
            ok: true,
            medico: medicoGuardado
        });
    });
});


/** PUT */
app.put('/:id', mdAutenticacion.verificarToken, (req, res) =>{

    var id = req.params.id;
    var body = req.body;

    Medico.findById(id, (error, medico) => {

        if(error){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar medico',
                errors: error
            });
        }

        if(!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Medico no encontrado',
                errors: error
            });
        }

        medico.nombre = body.nombre;
        medico.img = body.img;
        medico.hospital = body.hospital;
        medico.usuario = body.usuario;

        medico.save((error, medicoEditado) => {
            if(error){
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al editar medico',
                    errors: error
                });
            }

            res.status(200).json({
                ok: true,
                medico: medicoEditado,
                usuarioToken: req.usuario
            });
        });
    });
});


/** DELETE */
app.delete('/:id', mdAutenticacion.verificarToken, (req, res) => {

    var id = req.params.id;

    Medico.findByIdAndRemove(id, (error, medicoEliminado) => {
        if(error){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar medico',
                errors: error
            });
        }

        if(!medicoEliminado){
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico no se encontro',
                errors: error
            });
        }

        return res.status(200).json({
            ok: true,
            medico: medicoEliminado,
            usuarioToken: req.usuario
        });
    })
})

module.exports = app;