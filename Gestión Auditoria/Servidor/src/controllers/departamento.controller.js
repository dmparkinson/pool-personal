import {connection, sql} from '../config/database'
import {Departamento} from '../models/Departamento'
import {Mensajes} from './messages'



                                                                    //Listar los departamento
export const getListaDepartamento = async  (req, res) => {
    const pool = await connection();
    await pool.request().
    execute(`SelectDepartamento`).
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

                                                                    //Obtener un departamento con el id solicitado
export const getDepartamentoID = async  (req, res) => {
    const { id } = req.params;
    const pool = await connection();
                                    //Comprobacion datos vacios
    if( id != null){
        const pool = await connection();
        await pool.request().
        input('id_departamento',sql.SmallInt,id ).
        execute('SelectDepartamentoById').
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

                                                                    //Actualizar datos de un departamento
export const actualizarDepartamento = async(req, res) => {
    
    var departamento = new Departamento(req.body.nombre,req.body.eliminado);
    if(req.params.id != undefined && departamento.nombre != undefined){
        const pool = await connection();
        await pool.request().
        input('DepartamentoId',sql.SmallInt, req.params.id).
        input('Nombre',sql.NVarChar(30), departamento.nombre).
        input('Eliminado',sql.Bit, departamento.eliminado).
        execute('UpdateDepartamentoById'). // Lamado al procedimiento almacenado
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

                                                                    //Insertar nuevo departamento
export const crearDepartamento = async(req, res) => {
    var departamento = new Departamento(req.body.nombre,0);   
    if( departamento.nombre != undefined){
        const pool = await connection();
        await pool.request().
        input('Nombre',sql.NVarChar(30), departamento.nombre).
        input('Eliminado',sql.Bit, departamento.eliminado).
        execute('InsertDepartamento'). // Lamado al procedimiento almacenado
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