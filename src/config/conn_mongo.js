import mongoose from 'mongoose'
import dotenv from 'dotenv';

// Cargar las variables de entorno del archivo .env
dotenv.config();

export const dbConnect = async () => {
    const DB_URI = process.env.MONGODB_URI;
    
    if (!DB_URI) {
        console.error('Error: No se ha definido la variable MONGODB_URI en el archivo .env');
        process.exit(1); // Salir del proceso si no está definida
    }

    try {
        await mongoose.connect(DB_URI, {
            /*useNewUrlParser: true ,
            useUnifiedTopology: true,*/ //estos datos no se usan mas para la nueva versión de mongo
        });
        console.log('Conectado a la base de datos de MongoDB');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        process.exit(1); // Salir del proceso en caso de error
    }
};