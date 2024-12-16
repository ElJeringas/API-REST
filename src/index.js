import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from 'morgan';
import handlebars from 'express-handlebars';

/* Initializing express */
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* Settings */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


/* Middleware */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
app.get('/', (req, res) => {
    res.render('index');
});

/* app.get('/create', (req, res) => {
    res.render('create');
});
 */

/* Public Files */
app.use(express.static(path.join(__dirname, 'public')));

/* Starting the server */
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});