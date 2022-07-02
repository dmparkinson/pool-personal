import { connection, sql } from '../config/database'
import { Mensajes } from './messages'
var path = require("path");
const fs = require('fs');


//Listar las solicitid
export const getListaSolicitud = async (req, res) => {
    const pool = await connection();
    await pool.request().
        execute(`SelectSolicitud`).
        then(function (result) {
            if (result.rowsAffected > 0) {
                res.json({ success: true, msg: result.recordsets[0] });
            }
            else {
                res.json({ success: false, msg: Mensajes(3) });
            }
        }).catch(function (err) {
            console.log(err);
            res.json({ success: false, msg: Mensajes(6) });
        });
    pool.close();
}

//filtrar solicitudes por rango de fecha
export const getFiltrarSolicitud = async (req, res) => {

    if (req.params.fechaDeInicio && req.params.fechaDeFin) {
        console.log(req.params.fechaDeInicio + "   " + req.params.fechaDeFin);
        const pool = await connection();
        await pool.request().
            input('fechaInicio', sql.Date, req.params.fechaDeInicio).
            input('fechaFin', sql.Date, req.params.fechaDeFin).
            execute('SelectSolicitudByDate'). // Lamado al procedimiento almacenado
            then(function (result) {
                if (result.rowsAffected > 0) {
                    res.json({ success: true, msg: result.recordsets[0] });
                }
                else {
                    res.json({ success: false, msg: Mensajes(3) });
                }
            }).catch(function (err) {
                console.log(err);
                res.json({ success: false, msg: Mensajes(6) });
            });
        pool.close();
    }
    else {
        res.status(404).json({ success: false, msg: Mensajes(1) });
    }
};


//Listar las solicitides finalizadas
export const getSolicitudPendientes = async (req, res) => {
    const pool = await connection();
    await pool.request().
        execute(`SelectSolicitudByEstado`).
        then(function (result) {
            if (result.rowsAffected > 0) {
                res.json({ success: true, msg: result.recordsets[0] });
            }
            else {
                res.json({ success: false, msg: Mensajes(3) });
            }
        }).catch(function (err) {
            console.log(err);
            res.json({ success: false, msg: Mensajes(6) });
        });
    pool.close();
};

//Obtener cantidad de solicitudes finalizadas y no finalizadas
export const getSolicitudEstados = async (req, res) => {
    const pool = await connection();
    await pool.request().
        execute(`SelectSolicitudReporteFinalizado`).
        then(function (result) {
            if (result.rowsAffected > 0) {
                res.json({ success: true, msg: result.recordsets[0] });
            }
            else {
                res.json({ success: false, msg: Mensajes(3) });
            }
        }).catch(function (err) {
            console.log(err);
            res.json({ success: false, msg: Mensajes(6) });
        });
    pool.close();
}


//Obtener cantidad avances de las solicitudes
export const getAvancesSolicitud = async (req, res) => {
    const pool = await connection();
    await pool.request().
        execute(`SelectAvancesSolicitud`).
        then(function (result) {
            if (result.rowsAffected > 0) {
                res.json({ success: true, msg: result.recordsets[0] });
            }
            else {
                res.json({ success: false, msg: Mensajes(3) });
            }
        }).catch(function (err) {
            console.log(err);
            res.json({ success: false, msg: Mensajes(6) });
        });
    pool.close();
}


//Obtener una Solicitud con el id solicitado
export const getSolicitudID = async (req, res) => {
    const { id } = req.params;
    const pool = await connection();
    //Comprobacion datos vacios
    if (id != null) {
        const pool = await connection();
        await pool.request().
            input('id_Solicitud', sql.SmallInt, id).
            execute('SelectSolicitudById').
            then(function (result) {
                if (!result.recordsets[0][0]) {
                    res.json({ success: false, msg: Mensajes(3) });
                }
                else {
                    res.json({ success: true, msg: result.recordsets[0][0] });
                }
            }).catch(function (err) {
                console.log(err);
                res.json({ success: false, msg: Mensajes(6) });
            });
        pool.close();
    } else {
        res.status(404).json({ msg: Mensajes(1) });
    }
};

//Actualizar datos de una solicitud
export const actualizarSolicitud = async (req, res) => {
    let { alias, responsable, usuarioAplicativo, fecha, fechaFin, fechaInicio, responsableUsuarioFinal, documento, finalizado } = JSON.parse(req.body.data)

    if (req.params.id != undefined && responsable != undefined && alias != undefined && usuarioAplicativo != undefined
        && fechaFin != undefined && fechaInicio != undefined && responsableUsuarioFinal != undefined) {
        if (documento === '' || documento === null || documento === undefined) {  // Si ya hay un documento
            console.log('Sin documento');
        } else {
            if (!(req.file === undefined)) {                                                 //Si existe un file
                fs.unlinkSync('files/docs/solicitud/' + documento)                           //Verificar file y reemplazar
            }
        }
        if (!(req.file === undefined)) {
            const nameDoc = req.file.filename + Date.now() + '.' + req.file.mimetype.split('/')[1] //Crear nombre
            const pathFile = req.file.destination + nameDoc;
            documento = nameDoc;
            fs.renameSync(req.file.path, pathFile);                                         //Renombrar file
        }

        const pool = await connection();
        await pool.request().
            input('Alias', sql.NVarChar(30), alias).
            input('SolicitudId', sql.SmallInt, req.params.id).
            input('FechaEdicion', sql.SmallDateTime, fecha).
            input('UsuarioAplicativo', sql.SmallInt, usuarioAplicativo).
            input('Responsable', sql.SmallInt, responsable).
            input('UsuarioFinal', sql.SmallInt, usuarioAplicativo).
            input('FechaInicio', sql.Date, fechaInicio).
            input('FechaFin', sql.Date, fechaFin).
            input('DocumentoActaConstitutiva', sql.NVarChar(100), documento).
            input('finalizado', sql.Bit, finalizado).
            execute('UpdateSolicitudById'). // Lamado al procedimiento almacenado
            then(function (recordSet) {
                res.json({ success: true, msg: Mensajes(5) });
            }).catch(function (err) {
                console.log('El error es: ' + err);
                if (!(req.file === undefined)) {
                    fs.unlinkSync('files/docs/avance/' + documento)                           //Verificar file y reemplazar
                }
                res.json({ success: false, msg: Mensajes(6) });
            });
        pool.close();
    } else {
        if (!(req.file === undefined)) {
            fs.unlinkSync('files/docs/solicitud/' + documento)                           //Verificar file y reemplazar
        }
        res.status(404).json({ success: false, msg: Mensajes(1) });
    }
}


//Eliminar una solicitud
export const deleteSolicitud = async (req, res) => {
    if (req.params.id) {
        const pool = await connection();
        await pool.request().
            input('SolicitudId', sql.SmallInt, req.params.id).
            input('Usuario', sql.SmallInt, req.params.name).
            input('fechaHora', sql.DateTime, req.params.fecha).
            execute('DeleteSolicitud'). // Lamado al procedimiento almacenado
            then(function (recordSet) {
                res.json({ success: true, msg: Mensajes(5) });
            }).catch(function (err) {
                console.log('El error es: ' + err);
                res.json({ success: false, msg: Mensajes(6) });
            });
        pool.close();
    } else {
        res.status(404).json({ success: false, msg: Mensajes(1) });
    }
}

//Crear nueva solicitud
export const crearSolicitud = async (req, res) => {
    let { alias, responsable, usuarioAplicativo, fecha, fechaFin, fechaInicio, responsableUsuarioFinal, documento } = JSON.parse(req.body.data)
    if (responsable != undefined && alias != undefined && usuarioAplicativo != undefined
        && fechaFin != undefined && fechaInicio != undefined && responsableUsuarioFinal != undefined) {
        if (!(req.file === undefined)) {
            const nameDoc = req.file.filename + Date.now() + '.' + req.file.mimetype.split('/')[1] //Crear nombre
            const pathFile = req.file.destination + nameDoc;
            documento = nameDoc;
            fs.renameSync(req.file.path, pathFile);                                         //Renombrar file
        }
        const pool = await connection();
        await pool.request().
            input('Alias', sql.NVarChar(30), alias).
            input('FechaHora', sql.SmallDateTime, fecha).
            input('UsuarioAplicativo', sql.SmallInt, usuarioAplicativo).
            input('Responsable', sql.SmallInt, responsable).
            input('UsuarioFinal', sql.SmallInt, usuarioAplicativo).
            input('FechaInicio', sql.Date, fechaInicio).
            input('FechaFin', sql.Date, fechaFin).
            input('DocumentoActaConstitutiva', sql.NVarChar(100), documento).
            execute('InsertSolicitud'). // Lamado al procedimiento almacenado
            then(function (recordSet) {
                res.json({ success: true, msg: Mensajes(5) });
            }).catch(function (err) {
                console.log(err);
                res.json({ success: false, msg: Mensajes(6) });
            });
        pool.close();
    } else {
        if (!(req.file === undefined)) {
            fs.unlinkSync('files/docs/solicitud/' + documento)                           //Verificar file y reemplazar
        }
        res.status(404).json({ success: false, msg: Mensajes(1) });
    }
}

//Obtener file
export const getFile = async (req, res) => {
    try {
        let dir = path.resolve('files/docs/solicitud/' + req.params.nombre);
        res.sendFile(dir, function (err) {
            if (err) {
                res.json('Sin resultados');
            } else {
                console.log('Send: ', req.params.nombre)
            }
        })
    } catch (err) {
        res.json('Sin resultados');
    }
}


export const getFiltrarBitacora = async (req, res) => {

    if (req.params.mesInicio && req.params.mesFinal) {

        const pool = await connection();
        await pool.request().
            input('MesInicio', sql.Date, req.params.mesInicio).
            input('MesFinal', sql.Date, req.params.mesFinal).
            execute('SelectBitacora'). // Lamado al procedimiento almacenado
            then(function (result) {
                if (result.rowsAffected > 0) {
                    res.json({ success: true, msg: result.recordsets[0] });
                }
                else {
                    res.json({ success: false, msg: Mensajes(3) });
                }
            }).catch(function (err) {
                console.log(err);
                res.json({ success: false, msg: Mensajes(6) });
            });
        pool.close();
    } else {
        res.status(404).json({ success: false, msg: Mensajes(1) });
    }
};

//Listar las solicitid
export const getListaSolicitudActualizada = async (req, res) => {
    const pool = await connection();
    await pool.request().
        execute(`[SelectSolicitudActualizada]`).
        then(function (result) {
            if (result.rowsAffected > 0) {
                res.json({ success: true, msg: result.recordsets[0] });
            }
            else {
                res.json({ success: false, msg: Mensajes(3) });
            }
        }).catch(function (err) {
            console.log(err);
            res.json({ success: false, msg: Mensajes(6) });
        });
    pool.close();
}


