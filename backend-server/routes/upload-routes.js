
var express = require('express');
const fileUpload = require('express-fileupload');
var fs = require('fs');
const hospital = require('../models/hospital');

var app = express();
// default options
app.use(fileUpload());

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');

// Rutas
app.put('/:tabla/:id', (req, res) => {

    var tabla = req.params.tabla;
    var id = req.params.id;


    var tablasPosibles = ['medicos', 'hospitales', 'usuarios'];
    if(tablasPosibles.indexOf(tabla) < 0){
        return res.status(400).json({
            ok: false,
            mensaje: 'Tabla no existente',
            errors: { message: 'Las extenciones validas son ' + tablasPosibles.join(', ')}
        });
    }

    if(!req.files){
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono el archivo'
        });
    }

    /** nombre de archivo */
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    /** Extensiones permitidas */
    var extencionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if(extencionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            errors: { message: 'Las extenciones validas son ' + extencionesValidas.join(', ')}
        });
    }

    /** nombre de archivo personalizado */
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;
  
    /** Mover el archivo */
    var path = `./uploads/${tabla}/${nombreArchivo}`;

    archivo.mv( path, (error) => {
        if(error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
            });
        }
        
        subirPorTabla(tabla, id, nombreArchivo, res);
    });
});

function subirPorTabla( tabla, id, nombreArchivo, res ){
    switch (tabla){

        case 'usuarios':
            Usuario.findById(id, (error, usuario) => {
                var pathViejo = './uploads/usuarios/' + usuario.img;

                if(fs.existsSync(pathViejo)) {
                    fs.unlink(pathViejo);
                }

                usuario.img = nombreArchivo;

                usuario.save( (error, usuarioActualizado) => {

                    res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de usuario actualizada',
                        usuario: usuarioActualizado
                    });
                });
            });
            break;

        case 'hospitales':
            Hospital.findById(id, (error, hospital) => {
                var pathViejo = './uploads/hospitales/' + hospital.img;

                if(fs.existsSync(pathViejo)){
                    fs.unlink(pathViejo);
                }

                hospital.img = nombreArchivo;

                hospital.save((error, hospitalActualizado) => {
                    res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de hospital actualizada',
                        hospital: hospitalActualizado
                    });
                });
            });
            break;

        case 'medicos':
            Medico.findById(id, (error, medico) => {
                var pathViejo = './uploads/medicos/' + medico.img;

                if(fs.existsSync(pathViejo)){
                    fs.unlink(pathViejo);
                }

                medico.img = nombreArchivo;

                medico.save((error, medicoActualizado) => {
                    res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen del medico actualizada',
                        medico: medicoActualizado
                    });
                });
            });
            break;

        default:
            res.status(400).json({
                ok:false,
                mensaje: 'La tabla no existe'
            });
            break;
    }
}


module.exports = app;