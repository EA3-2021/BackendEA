//Importamos dependencias
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from'body-parser';

//Importamos fichero de rutas
import userRoutes from './routes/user.routes'
import teamRoutes from './routes/team.routes'
import authRoutes from './routes/auth.routes'
import adminRoutes from './routes/admin.routes'
import licenseRoutes from './routes/license.routes'
<<<<<<< HEAD
import faqRoutes from './routes/faq.routes'
=======
>>>>>>> 6c881eccf9b1c3e004e329a26612b0239fe4b345

//Inicializamos express
const app = express();

//Configuración
//Cuando haya variable de entorno sera PORT y sino 3000
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json());

//Llama a las rutas de la API
app.use('/user', userRoutes);
app.use('/team', teamRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/license', licenseRoutes)
<<<<<<< HEAD
app.use('/faq', faqRoutes);
=======
>>>>>>> 6c881eccf9b1c3e004e329a26612b0239fe4b345

//Exportamos fichero como 'app'
export default app;