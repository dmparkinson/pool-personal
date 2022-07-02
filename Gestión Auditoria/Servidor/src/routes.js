
import {Router} from 'express';
import Avance from './routes/avance.routes';
import Departamento from './routes/departamento.routes';
import Funcionario from './routes/funcionario.routes';
import Solicitud from './routes/solicitud.routes';
import Trimestre from './routes/trimestre.routes';
import Transaccion from './routes/transaccion.routes';
import Files from './routes/files.routes';

const router = Router();

router.use(Avance.routes);
router.use(Departamento.routes);
router.use(Funcionario.routes);
router.use(Solicitud.routes);
router.use(Trimestre.routes);
router.use(Transaccion.routes);
router.use(Files.routes);

export default router;




