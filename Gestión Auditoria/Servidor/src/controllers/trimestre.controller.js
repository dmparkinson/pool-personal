import {connection, sql} from '../config/database'
import {Trimestre} from '../models/Trimestre'
import {Mensajes} from './messages'



                                                                    //Listar los trimestre
export const getListaTrimestre = async  (req, res) => {
    const pool = await connection();
    await pool.request().
    execute(`SelectTrimestre`).
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

                                                                    //Obtener un trimestre con el id solicitado
export const getTrimestreID = async  (req, res) => {
    const { id } = req.params;
    const pool = await connection();
                                    //Comprobacion datos vacios
    if( id != null){
        const pool = await connection();
        await pool.request().
        input('IdTrimestre',sql.SmallInt,id ).
        execute('SelectTrimestreById').
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

                                                                    //Actualizar datos de un trimestre
export const actualizarTrimestre = async(req, res) => {
    var trimestre = new Trimestre(req.body.descripcion);
    if(req.params.id != undefined && trimestre.descripcion != undefined){
        const pool = await connection();
        await pool.request().
        input('TrimestreId',sql.SmallInt, req.params.id).
        input('Descripcion',sql.NVarChar(30), trimestre.descripcion).
        execute('UpdateTrimestreById'). // Lamado al procedimiento almacenado
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

                                                                    //Insertar nuevo trimestre
export const crearTrimestre = async(req, res) => {
    var trimestre = new Trimestre(req.body.descripcion);
    
    if( trimestre.descripcion != undefined){
        const pool = await connection();
        await pool.request().
        input('Descripcion',sql.NVarChar(30), trimestre.descripcion).
        execute('InsertTrimestre'). // Lamado al procedimiento almacenado
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