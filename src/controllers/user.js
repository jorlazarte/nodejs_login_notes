import passport from 'passport'
import bcrypt from 'bcryptjs'
import userDB from '../db/mongo/user.js'

const registerUser = async (req, res) => {
    
    console.log('controllerUSER.registerUser')
    const { name, email, password, confirm_password } = req.body

    if(password != confirm_password){
        req.flash('success_msg', 'ERROR revise password y confirmacion de password')
        res.redirect('/register')
    }

    const passEncrypt = await bcrypt.hash(password, 10)

    const userRegister = {name: name, email: email, password: passEncrypt, confirm_password: passEncrypt}
    console.log('registerUser', userRegister)
    
    const userReg = await userDB.registerUser( userRegister )
    console.log('userReg que devuelve db', userReg)
    console.log('userReg mensaje', userReg.msg)
    if(userReg.msg == 'error'){
        req.flash('success_msg', userReg.txt)
        res.redirect('/register')
    }else{
        req.flash('success_msg', userReg.txt)    
        res.redirect('/login')
    }

}

const loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

const userController = {
    registerUser,
    loginUser /*,
    edit,
    edit_save,
    remove*/
}

export default userController;