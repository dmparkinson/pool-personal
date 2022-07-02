import {Router} from 'express';
const router = Router();
const multer = require('multer')

const storage = multer.diskStorage({ 
    destination : (req, file, cb) => {
        cb(null,'files/')
    }  
})


const upload = multer({ storage })




import {guardar, listar, get} from '../controllers/file.controller';

router.get('/file/', listar);
router.get('/file/:id', get);
router.post('/file/crear/',upload.single('file'), guardar);


module.exports.routes = router;




