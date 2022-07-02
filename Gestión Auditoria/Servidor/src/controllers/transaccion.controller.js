import {connection, sql} from '../config/database'
import {Transaccion} from '../models/Transaccion'
import {Mensajes} from './messages'



                                                                    //Listar las  transacciones
export const getListaTransaccion = async  (req, res) => {
    const pool = await connection();
    await pool.request().
    execute(`SelectTransaccion`).
    then(function(result) {
        if(result.rowsAffected>0){
            res.json({success: true, msg:result.recordsets[0]}); 
        }
        else{
            res.json({success: false, msg: Mensajes(3)});                  
        }
    }).catch(function(err) {
        console.log(err);
        res.json({success: false,msg: Mensajes(6)});
    });
    pool.close();
}

                                                                    //Obtener una transaccion con el id solicitado
export const getTransaccionID = async  (req, res) => {
    const { id } = req.params;
    const pool = await connection();
                                    //Comprobacion datos vacios
    if( id != null){
        const pool = await connection();
        await pool.request().
        input('IdTransaccion',sql.SmallInt,id ).
        execute('SelectTransaccionById').
        then(function(result) {
            if(!result.recordsets[0][0]){
                res.json({success: false, msg: Mensajes(3)});                  
            }
            else{
                res.json({success: true, msg:result.recordsets[0][0]}); 
            }
        }).catch(function(err) {
            console.log(err);
            res.json({success: false,msg: Mensajes(6)});
        });
        pool.close();
    } else{
        res.status(404).json({success: false,msg: Mensajes(1)});
    }   
}

                                                                    //Actualizar datos de una transaccion
export const actualizarTransaccion = async(req, res) => {
    var transaccion = new Transaccion(req.body.descripcion);
    if(req.params.id != undefined && transaccion.descripcion != undefined){
        const pool = await connection();
        await pool.request().
        input('TransaccionId',sql.SmallInt, req.params.id).
        input('Descripcion',sql.NVarChar(30), transaccion.descripcion).
        execute('UpdateTransaccionById'). // Lamado al procedimiento almacenado
            then(function(recordSet) {
                res.json({success: true, msg: Mensajes(5)});
            }).catch(function(err) {
                console.log(err);
                res.json({success: false,msg: Mensajes(6)});
            });
        pool.close();
    } else{
        res.status(404).json({success: false,msg: Mensajes(1)});
    } 
}

                                                                    //Insertar nueva transaccion
export const crearTransaccion = async(req, res) => {
    var transaccion = new Transaccion(req.body.descripcion);
    
    if( transaccion.descripcion != undefined){
        const pool = await connection();
        await pool.request().
        input('Descripcion',sql.NVarChar(30), transaccion.descripcion).
        execute('InsertTransaccion'). // Lamado al procedimiento almacenado
            then(function(recordSet) {
                res.json({success: true, msg: Mensajes(5)});
            }).catch(function(err) {
                console.log(err);
                res.json({success: false,msg: Mensajes(6)});
            });
        pool.close();
    } else{
        res.status(404).json({success: false,msg: Mensajes(1)});
    } 
}