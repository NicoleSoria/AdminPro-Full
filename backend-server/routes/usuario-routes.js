
var express = require('express');
var bcrypt = require('bcryptjs');
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Usuario = require('../models/usuario');

/** Obtener los usuarios */
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({ }, 'nombre email img role')
        .skip(desde)
        .limit(5)
        .exec((error, usuarios) => {

            if(error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: error
                });
            }
            
            Usuario.count({}, (error, conteo) => {
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios,
                    total: conteo
                });
            });
    });
});


/** Crear usuarios */
app.post('/', (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save( ( error, usuarioGuardado ) => {
        if(error) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuarios',
                errors: error
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        });
    });
});

/** Actualizar usuario */
app.put('/:id', mdAutenticacion.verificarToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (error, resp) => {

        if(error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: error
            });
        }

        if(!resp) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario no existe',
                errors: {message: 'El usuario no existe'}
            });
        }

        resp.nombre = body.nombre;
        resp.email = body.email;
        resp.role = body.role;

        resp.save( (error, usuarioGuardado) => {
           
            if(error){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: error
                });
            }

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado,
                usuarioToken: req.usuario
            });
        });
    });
});

/** Eliminar usuario */
app.delete('/:id', mdAutenticacion.verificarToken, (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (error, usuarioBorrado) => {
        if(error){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: error
            });
        }

        if(!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario no existe',
                errors: {message: 'El usuario no existe'}
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado,
            usuarioToken: req.usuario
        });
    });
});




module.exports = app;