import userModel from '../../models/user.js'

const registerUser = async (userRegister) => {
	// Look for email coincidence
    console.log('db.registerUser')
    //const { name, email, password, confirm_password } = req.body
    //const userRegister = {name: name, email: email, password: password, confirm_password: confirm_password}
    console.log('db_registerUser', userRegister)
    
    try {
    	console.log('registerUser_email', userRegister.email)
    	/*
    	if(userRegister.password != userRegister.confirm_password){
            console.log('error pass y confirm pass')
            return {msg: 'error', txt: 'revise password y confirmacion de password'}
    	}*/

        // Verifica si el email ya está registrado
        const existeUsuario = await userModel.findOne({ email: userRegister.email });
        if (existeUsuario) {
            console.log('existeUsuario')
            return {msg: 'error', txt: 'USUARIO YA EXISTE'}
        }
        
        // Crea un nuevo usuario si el email no existe
        const newUser = new userModel( userRegister );
        const usuarioGuardado = await newUser.save();
        console.log("Usuario registrado con éxito:", usuarioGuardado);
        return {msg: 'ok', txt: 'USUARIO registrado correctamente'};
        

    } catch (error) {
        console.error("Error al registrar el usuario:", error.message);
        throw error;
    }
}

const loginUser = async ( loginUser ) => {
	// Look for email coincidence
    console.log('db.registerUser', loginUser)
    //const { email, password } = req.body
    //const userLogin = {email: email, password: password}
    //console.log('db_registerUser', userLogin)
    
}

const userDB = {
    registerUser,
    loginUser /*,
    edit,
    edit_save,
    remove*/
}

export default userDB;