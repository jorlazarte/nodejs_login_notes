import fs from 'fs'
import express from 'express'
//import trackController from '../controllers/tracks.js'

import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio actual
const __dirname = path.dirname(__filename);

// Imprimir el directorio
console.log('ARCHIVO: index.js imprime el directorio', __dirname);

const PATH_ROUTES = __dirname

// Importación dinámica usando import()
const loadRoute = async (name) => {
    console.log('archivo final', `../routes/${name}.js`)
    const module = await import(`../routes/${name}.js`);
    return module.default;
};

router.get('/about', (req, res) => {
    console.log('ingresa por index')
  res.render('about.hbs', { title: 'Mi aplicación con Handlebars' });
});

router.use('/:name', async (req, res, next) => {
    console.log('Parámetros:', req.params);
    const { name} = req.params;
    console.log('donde tendria que ir', name)
    
    try {
        const route = await loadRoute(name);
        
        // Montar el router dinámico
        router.use(`/${name}`, route); // Montar la ruta dinámicamente
        next(); // Continuar con el manejo de la ruta
    } catch (err) {
        next(err);
    }
})

router.get('/', (req, res) => {
    console.log('ingresa por index')
  res.render('index.hbs', { title: 'Mi aplicación con Handlebars' });
});

// Exportar el router para que se pueda usar en app.js
export default router;


