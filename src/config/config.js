import path from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // Obtener la ruta del archivo actual
const __dirname = path.dirname(__filename) // Obtener el directorio actual

// Cargar las variables del archivo .env al entorno de Node.js
import dotenv from 'dotenv';

// Configurar dotenv
dotenv.config();

export const {
	PORT = 3500,
	hbsConf = {
		extname: '.hbs',
		defaultLayout: 'main',
		layoutsDir: path.join(__dirname, 'views', 'layouts')
	},
	sessionConf = {
		secret: 'mysecretapp',
		resave: true,
		saveUninitialized: true
	}
} = process.env