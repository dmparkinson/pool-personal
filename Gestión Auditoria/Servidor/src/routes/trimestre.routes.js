import {Router} from "express";
const router = Router();
import {getListaTrimestre,getTrimestreID,actualizarTrimestre,crearTrimestre} from '../controllers/trimestre.controller';


router.get('/trimestre/',getListaTrimestre);
router.get('/trimestre/:id',getTrimestreID);
router.put('/trimestre/actualizar/:id', actualizarTrimestre);
router.post('/trimestre/crear', crearTrimestre);

module.exports.routes = router;