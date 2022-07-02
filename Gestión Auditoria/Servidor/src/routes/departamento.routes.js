import {Router} from "express";
const router = Router();
import {getListaDepartamento,getDepartamentoID,actualizarDepartamento,crearDepartamento} from '../controllers/departamento.controller';


router.get('/departamento/',getListaDepartamento);
router.get('/departamento/:id',getDepartamentoID);
router.put('/departamento/actualizar/:id', actualizarDepartamento);
router.post('/departamento/crear', crearDepartamento);



module.exports.routes = router;