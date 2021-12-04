import userServices from "../services/userServices";
let handleLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let userData = await userServices.handleUserLogin(email, password);
    return res.status(200).json({
        errMessage: userData.errMessage,
        errCode: userData.errCode,
        user: userData.user ? userData.user : {},
    })
}
module.exports = {
    handleLogin: handleLogin
}