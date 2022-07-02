import {Router} from "express";
const router = Router();
const multer = require('multer')

const storage = multer.diskStorage({ 
    destination : (req, file, cb) => {
        cb(null,'files/docs/solicitud/')
    }  
})
const upload = multer({ storage })
import {getListaSolicitud,getSolicitudID,actualizarSolicitud,crearSolicitud,deleteSolicitud, getFile,getSolicitudPendientes, 
    getSolicitudEstados, getAvancesSolicitud, getFiltrarSolicitud, getFiltrarBitacora, getListaSolicitudActualizada} from '../controllers/solicitud.controller';

router.get('/solicitud/', getListaSolicitud);
router.get('/solicitud/pendiente', getSolicitudPendientes);
router.get('/solicitud/estado', getSolicitudEstados);
router.get('/solicitud/avances', getAvancesSolicitud);
router.get('/solicitud/:id', getSolicitudID);
router.get('/solicitud/file/:nombre', getFile);
router.post('/solicitud/crear', upload.single('file'),crearSolicitud);
router.put('/solicitud/actualizar/:id', upload.single('file'), actualizarSolicitud);
router.delete('/solicitud/:id/:name/:fecha', deleteSolicitud);
router.get('/solicitud/filtro/:fechaDeInicio/:fechaDeFin', getFiltrarSolicitud);
router.get('/bitacora/filtro/:mesInicio/:mesFinal', getFiltrarBitacora);
router.get('/bitacora/actualizacion', getListaSolicitudActualizada);



module.exports.routes = router;