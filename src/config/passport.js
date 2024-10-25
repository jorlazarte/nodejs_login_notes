// passportConfig.js
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local';

import userModel from '../models/user.js'

// Configuración de la estrategia local
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        // Busca el usuario por email
        const usuario = await userModel.findOne({ email });
        if (!usuario) {
            return done(null, false, { message: 'Email no registrado' });
        }

        // Verifica la contraseña
        const esValido = await usuario.validarPassword(password);
        if (!esValido) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, usuario);
    } catch (error) {
        return done(error);
    }
}));

// Serialización y deserialización de usuario
passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await userModel.findById(id);
        done(null, usuario);
    } catch (error) {
        done(error);
    }
});

export default passport