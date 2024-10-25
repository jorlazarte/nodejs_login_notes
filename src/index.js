import express from 'express'
import 'dotenv/config'
import path from 'path';
import { fileURLToPath } from 'url'
import methodOverride from 'method-override'
import session from 'express-session'

import {dbConnect} from './config/conn_mongo.js'
import passport from './config/passport.js'

import flash from 'connect-flash'
import hbs from 'hbs'
import { engine } from 'express-handlebars';

import apiRoutes from './routes/index.js'

import { PORT, sessionConf, hbsConf } from './config/config.js' //traigo la variable desde config

console.log('sessionConf', sessionConf)
console.log('hbsConf', hbsConf)
const app = express()

//************************************SETTINGS************************************
console.log('00000', import.meta.url)
const __filename = fileURLToPath(import.meta.url) // Obtener la ruta del archivo actual
const __dirname = path.dirname(__filename) // Obtener el directorio actual

console.log('1111', path.join(__dirname, 'views'))
console.log('2222', path.join(__dirname, 'views', 'partials'))

// Conectar a la base de datos
dbConnect();

// Configurar Handlebars como motor de vistas
app.engine('hbs', engine({
	extname: '.hbs', // Extensión de archivos Handlebars
	defaultLayout: 'main', // Layout por defecto (main.hbs)
	layoutsDir: path.join(__dirname, 'views', 'layouts')  // Ruta a los layouts
}));
//app.engine('hbs', engine(hbsConf));

app.set('views', path.join(__dirname, 'views')) // Establecer la ubicación de las vistas y los layouts
app.use(express.static(path.join(__dirname, 'public'))) // Registrar un middleware para servir archivos estáticos como CSS, imágenes, etc.

//************************************MIDDLEWARES**************************************
app.use( express.urlencoded({extended: true}) ) //
app.use( express.json() )
app.use( methodOverride('_method') )
/*app.use( session({
	secret: 'mysecretapp',
	resave: true,
	saveUninitialized: true
}) )*/
app.use( session(sessionConf) )


app.use( passport.initialize() )
app.use( passport.session() )

app.use(flash());


//**********************************GLOBAL VARIABLES**********************************
app.use( (req, res, next) => {
	res.locals.success_msg = req.flash('success_msg')
	res.locals.error_msg = req.flash('error_msg')
	res.locals.error = req.flash('error')
	res.locals.user = req.user || null
	next()
} )


//************************************ROUTES************************************
app.use('/', apiRoutes)
// Ruta de ejemplo

//************************************STATICS FILES************************************
app.use( express.static(path.join(__dirname, 'public') ) )


//************************************SERVER************************************
app.listen( PORT, () => {
	console.log(`escuchando server http//localhost:${PORT}`)
})
