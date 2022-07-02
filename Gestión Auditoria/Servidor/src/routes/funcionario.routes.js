import {Router} from "express";
const router = Router();
import {getListaFuncionario,getFuncionarioID,actualizarFuncionario,crearFuncionario, loginFuncionario} from '../controllers/funcionario.controller';


router.get('/funcionario/', getListaFuncionario);
router.get('/funcionario/:id', getFuncionarioID);
router.put('/funcionario/actualizar/:id', actualizarFuncionario);
router.post('/funcionario/crear', crearFuncionario);


// Login
router.get('/login/:user/:passw/', loginFuncionario);


module.exports.routes = router;