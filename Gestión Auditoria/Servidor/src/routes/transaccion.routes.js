import {Router} from "express";
const router = Router();
import {getListaTransaccion,getTransaccionID,actualizarTransaccion,crearTransaccion} from '../controllers/transaccion.controller';


router.get('/transaccion/',getListaTransaccion);
router.get('/transaccion/:id',getTransaccionID);
router.put('/transaccion/actualizar/:id', actualizarTransaccion);
router.post('/transaccion/crear', crearTransaccion);

module.exports.routes = router;