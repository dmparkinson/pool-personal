import {Router} from 'express';
const router = Router();

const multer = require('multer')

const storage = multer.diskStorage({ 
    destination : (req, file, cb) => {
        cb(null,'files/docs/avance/')
    }  
})
const upload = multer({ storage })
import {getListaAvance,getAvanceID, actualizarAvance, crearAvance, getFile,deleteAvance, getFiltrarAvence} from '../controllers/avance.controller';

router.get('/avance/', getListaAvance);
router.get('/avance/:id', getAvanceID);
router.get('/avance/file/:nombre', getFile);
router.put('/avance/actualizar/:id', upload.single('file'), actualizarAvance);
router.post('/avance/crear/', upload.single('file'), crearAvance);
router.delete('/avance/:id', deleteAvance);

router.get('/avancetrimestral/:solicitud/:trimestre', getFiltrarAvence);

module.exports.routes = router;




