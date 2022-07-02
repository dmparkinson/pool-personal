import { MAX } from 'mssql';
import {connection, sql} from '../config/database'
import {Mensajes} from './messages'



export const listar = async  (req, res) => {
    const pool = await connection();
    await pool.request().
    execute(`SelectFiles`).
    then(function(result) {
        if(result.rowsAffected>0){
            result.buffer.toString('base64');
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

export const get = async  (req, res) => {
    const pool = await connection();
    await pool.request().
    input('id',sql.SmallInt(MAX), req.params.id).
    execute(`SelectFileByID`).
    then(function(result) {
        if(result.rowsAffected>0){
            const p= result.recordset[0].documento.buffer.toString('base64');
            res.json(result.recordset[0].documento); 
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



          
export const guardar = async(req, res) => {
    const { usuario } = JSON.parse(req.body.data)
    //var binBuff =Buffer.concat (req.file);
    const binBuff = new Buffer([req.file])
    console.log(usuario)
    if( usuario != undefined){
        const pool = await connection();
        await pool.request().
        input('documento',sql.VarBinary(MAX), binBuff).
        input('nombre',sql.NVarChar(30), usuario).
        execute('InsertFile'). // Lamado al procedimiento almacenado
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