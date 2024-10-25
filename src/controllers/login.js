import userDB from '../db/mongo/user.js'

const index = async (req, res) => {
    
    console.log('controllerLOGIN.login')
    res.render('login/login.hbs')
}

const login = async (req, res) => {
    
    const { email, password } = req.body
    const loginUser = { email, password }

    console.log('controllerLOGIN.login', loginUser)
    const resLoginUser = await userDB.loginUser( loginUser )

    //res.render('login/login.hbs')
}

const loginController = {
    index,
    login /*,
    edit,
    edit_save,
    remove*/
}

export default loginController;