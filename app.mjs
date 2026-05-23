import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import paisesARoutes from './routes/paisesARoutes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/****************************************************************
// Configura EJS como el DIRECTORIO de vistas en Extress. Sprint 3. tp 3.
app.set('views', path.join(__dirname, 'views'));
******************************************************************/

// Configura EJS como el motor de vistas en Extress. Sprint 3. tp 3. Etapa 2. Requerimiento 1.
app.set('view engine', 'ejs');
//Configura EJS como el directorio de vistas en Extress. Sprint 3. tp 3.
// En el ejemplo práctico: app.set('views', path.join(import.meta.dirname, 'ejs.layout', 'views'));
app.set('views', path.join(__dirname, 'layout', 'views'));

app.use(methodOverride('_method'));

// Middleware para parsear JSON:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'layout','public')));  //permite usar imagenes, css, js.
// La carpeta de archivos estáticos está dentro de layout/public.

// Conexión a MongoDB:
connectDB();

// configurar express-ejs-layouts.  Sprint 4.1 
app.use(expressLayouts);
app.set('layout', 'layout'); // archivo base de layout.

const navbarLinks = [
    { text: 'Inicio', href: '/', icon: '/icons/home.svg' },
    { text: 'Acerca de', href: '/about', icon: '/icons/info.svg' },
    { text: 'Contacto', href: '/contact', icon: '/icons/contact.svg' }
];
app.locals.navbarLinks = navbarLinks;

/*********corregir las rutas ********/
// Configuración de rutas:
app.use('/api/paisesA', paisesARoutes);

// Ruta principal. Renderiza la vista index.ejs- Sprint 4.1 
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Página Principal'
    });
});

// Ruta para la página "Acerca de" renderiza la vista about.ejs. Sprint 4.1 
app.get('/about', (req, res) => {
    res.render('about', { title: 'Acerca de Nosotros'});
});

// Ruta para la página "Contacto" renderiza la vista contact.ejs. Sprint 4.1 
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contáctanos'});
});

// Iniciar el servidor:
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});