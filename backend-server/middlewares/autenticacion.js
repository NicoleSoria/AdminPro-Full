
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

/** Verificar token */
exports.verificarToken = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (error, decoded) => {
        if(error) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Error en token',
                errors: error
            });
        }

        req.usuario = decoded.usuario;
        next();

        // return res.status(200).json({
        //     ok: true,
        //     decoded: decoded
        // });
    });
}
