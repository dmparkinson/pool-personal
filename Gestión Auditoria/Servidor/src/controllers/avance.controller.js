import {connection, sql} from '../config/database'
const fs = require('fs');
import {Mensajes} from './messages'
var path = require("path");


                                                                    //Listar los avances
export const getListaAvance = async  (req, res) => {
    const pool = await connection();
    await pool.request().
    execute(`SelectAvance`).
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

                                                                //Obtener un avance con el id solicitado
export const getAvanceID = async  (req, res) => {
    const { id } = req.params;
    const pool = await connection();
                                    //Comprobacion datos vacios
    if( id != null){
        const pool = await connection();
        await pool.request().
        input('id_avance',sql.SmallInt,id ).
        execute('SelectAvanceById').
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
        res.status(404).json({msg: Mensajes(1)});
    }   
};

                                                                    //Actualizar datos de un avance
export const actualizarAvance = async(req, res) => {
    let id = req.params.id;  
    let { trimestre, usuarioAplicativo, solicitud, documento,fecha } = JSON.parse(req.body.data)  
    if(id != undefined || trimestre != undefined && usuarioAplicativo != undefined && solicitud != undefined && 
        fecha != undefined || documento!= undefined){
        if(documento==='' || documento === null || documento === undefined){  // Si ya hay un documento
            console.log('Sin documento');
        }else{   
            if(!(req.file === undefined)){                                                 //Si existe un file
            fs.unlinkSync('files/docs/avance/' +documento)                           //Verificar file y reemplazar
            }        
        }
        if(!(req.file === undefined)){
            const nameDoc = req.file.filename + Date.now() + '.'+ req.file.mimetype.split('/')[1] //Crear nombre
            const pathFile = req.file.destination + nameDoc;      
            documento = nameDoc;                     
            fs.renameSync(req.file.path, pathFile);                                         //Renombrar file
        }
        const pool = await connection();
        await pool.request().
        input('AvanceId',sql.SmallInt, id).
        input('TrimestreId',sql.TinyInt, trimestre).
        input('UsuarioAplicativo',sql.SmallInt, usuarioAplicativo).
        input('SolicitudId',sql.SmallInt, solicitud).
        input('Documento',sql.NVarChar(100), documento).
        execute('UpdateAvanceById'). // Lamado al procedimiento almacenado
            then(function(recordSet) {
                res.json({success: true,msg: Mensajes(5)});
            }).catch(function(err) {
                console.log(err);
                if(!(req.file === undefined)){   
                    fs.unlinkSync('files/docs/avance/' +documento)                           //Verificar file y reemplazar
                }
                res.json({success: false,msg: Mensajes(6)});
            });
        pool.close();
    } else{
        if(!(req.file === undefined)){   
            fs.unlinkSync('files/docs/avance/' +documento)                           //Verificar file y reemplazar
        }
        res.status(404).json({success: false, msg: Mensajes(1)});
    } 
}

                                                                   //Eliminar avance
export const deleteAvance = async(req, res) => {
    if(req.params.id != undefined ){
        const pool = await connection();
        await pool.request().
        input('AvanceId',sql.SmallInt, req.params.id).
        execute('DeleteAvance'). // Lamado al procedimiento almacenado
            then(function(recordSet) {
                res.json({success: true,msg: Mensajes(5)});
            }).catch(function(err) {
                console.log(err);
                res.json({success: false,msg: Mensajes(6)});
            });
        pool.close();
    } else{
        res.status(404).json({success: false, msg: Mensajes(1)});
    } 
}

                                                                    //Cear nuevo avance
export const crearAvance = async (req, res) => {
    let { trimestre, usuarioAplicativo, solicitud, documento,fecha } = JSON.parse(req.body.data)  
    let solicitudFinalizada = JSON.parse(req.body.solicitudEstado)  
    if( trimestre != undefined && usuarioAplicativo != undefined && solicitud != undefined && 
        fecha != undefined && solicitudFinalizada != undefined){

        if(!(req.file === undefined)){   
            const nameDoc = req.file.filename + Date.now() + '.'+ req.file.mimetype.split('/')[1] //Crear nombre
            const pathFile = req.file.destination + nameDoc;      
            documento = nameDoc;                     
            fs.renameSync(req.file.path, pathFile);                                         //Renombrar file
        }
        const pool = await connection();
        await pool.request().
        input('TrimestreId',sql.TinyInt, trimestre).
        input('UsuarioAplicativo',sql.SmallInt, usuarioAplicativo).
        input('SolicitudId',sql.SmallInt, solicitud).
        input('Documento',sql.NVarChar(100), documento).
        input('FechaHora',sql.SmallDateTime, fecha).
        input('SolicitudEstado',sql.Bit, solicitudFinalizada).
        execute('InsertAvance'). // Lamado al procedimiento almacenado
            then(function(recordSet) {
                res.json({success: true,msg: Mensajes(5)});
            }).catch(function(err) {
                if(!(req.file === undefined)){   
                    fs.unlinkSync('files/docs/avance/' +documento)                           //Verificar file y reemplazar
                }
                res.json({success: false,msg: Mensajes(6)});
            });
        pool.close();
    }else{
        if(!(req.file === undefined)){   
            fs.unlinkSync('files/docs/avance/' +documento)                           //Verificar file y reemplazar
        }
        res.status(404).json({success: false,msg: Mensajes(1)});
    } 
    
}

                                                               //Obtener file
export const getFile = async (req, res) => {
    try{
        const dir = path.resolve('files/docs/avance/' + req.params.nombre);         
        res.sendFile(dir, function(err){
            if(err){
                res.json('Sin resultados');
            }else{
                console.log('Send: ', req.params.nombre)
            }
        })
    }catch(err){
        res.json('Sin resultados');
    }


}

export const getFiltrarAvence = async (req, res) => {

    console.log(req.params.solicitud+"   "+req.params.trimestre)
    if(req.params.solicitud && req.params.trimestre){  
        
        const pool = await connection();
        await pool.request().
        input('Solicitud',sql.SmallInt, req.params.solicitud).
        input('Trimestre',sql.TinyInt, req.params.trimestre).
        execute('SelectAvanceTrimestral'). // Lamado al procedimiento almacenado
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
    } else{
        res.status(404).json({success: false,msg: Mensajes(1)});
    } 

    }


