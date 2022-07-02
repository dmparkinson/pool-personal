require('dotenv').config();
import cors from 'cors'
import express from 'express'
import morgan from 'morgan';



const app = express();


import router from './routes';

// Config request
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
//app.use(morgan('dev'))

  
// Config puerto/host cliente
app.listen(process.env.PORT_API, '0.0.0.0',function(){
  console.log('Conexión en el puerto: ',  process.env.PORT_API);
} );


var corsConfig = {
    origin: 'http://192.168.1.157:4021',  // Cambiar dependiendo del puerto en Angular
    optionsSuccessStatus: 200 
  }

  app.use(cors());

  // Rutas
  app.use('/api',router);


