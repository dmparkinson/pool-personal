import {connection, sql} from '../config/database';
import {Funcionario} from '../models/Funcionario'
import {Mensajes} from './messages'

                                                                    //Listar los funcionarios
export const getListaFuncionario = async  (req, res) => {
    const pool = await connection();
    await pool.request().
    execute(`SelectFuncionario`).
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
                                                                    //Obtener sesion funcionario 

export const loginFuncionario = async  (req, res) => {    
    const { user } = req.params;
    const { passw } = req.params;
    if( user != null && passw!= null){
        const pool = await connection();
        await pool.request().
        input('logname',sql.NVarChar(20), user ).
        input('contraseña',sql.NVarChar(20),passw ).
        execute('LoginFuncionario').
        then(function(result) {
            if(!result.recordsets[0][0]){
                console.log('vacio');
                res.json({success: false, msg: Mensajes(7)});  
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

                                                                    //Obtener un funcionario con el id solicitado
export const getFuncionarioID = async  (req, res) => {
    const { id } = req.params;
    const pool = await connection();
                                    //Comprobacion datos vacios
    if( id != null){
        const pool = await connection();
        await pool.request().
        input('id_Funcionario',sql.SmallInt,id ).
        execute('SelectFuncionarioById').
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

                                                                    //Actualizar datos de un funcionario
export const actualizarFuncionario = async(req, res) => {
    console.log(req);

    
    if(req.body.nombre != undefined){
        const pool = await connection();
        await pool.request().
        input('FuncionarioId',sql.SmallInt, req.params.id).
        input('Nombre',sql.NVarChar(30), req.body.nombre).
        input('FechaNacimiento',sql.SmallDateTime, req.body.fechaNacimiento).
        input('Foto',sql.NVarChar(100), req.body.foto).
        input('Departamento',sql.SmallInt, req.body.departamento).
        input('Logname',sql.NVarChar(20),req.body.logname ).
        input('Contraseña',sql.NVarChar(20), req.body.contrasenia ).
        input('Eliminado',sql.Bit, req.body.eliminado).
        execute('UpdatefuncionarioById'). // Lamado al procedimiento almacenado
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

                                                                    //Insertar nuevo funcionario
export const crearFuncionario = async(req, res) => {
   
    if(req.body.nombre != undefined){
        const pool = await connection();
        await pool.request().
        input('Nombre',sql.NVarChar(30), req.body.nombre).
        input('FechaNacimiento',sql.SmallDateTime, req.body.fechaNacimiento).
        input('Sexo',sql.TinyInt, req.body.sexo).
        input('Foto',sql.NVarChar(100), req.body.Foto).
        input('Departamento',sql.SmallInt, req.body.departamento).
        input('Logname',sql.NVarChar(20),req.body.logname ).
        input('Contraseña',sql.NVarChar(20),req.body.contrasenia ).
        input('Eliminado',sql.Bit, req.body.eliminado).
        execute('InsertFuncionario'). // Lamado al procedimiento almacenado
            then(function(recordSet) {
                res.json({success: true, msg: Mensajes(5)});
            }).catch(function(err) {
                console.log(err);
                res.json({success: false, msg: Mensajes(6)});
            });
        pool.close();
    } else{
        res.status(404).json({success: false,msg: Mensajes(1)});
    } 
}

