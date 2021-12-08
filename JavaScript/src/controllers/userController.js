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
let handleGetAllUser = async(req, res) => {
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter!',
            users: []
        })
    }
    let users = await userServices.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok,',
        users
    })
}
let handleDeleteUser = async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing input parameters!"
        })
    }
    let message = await userServices.deleteUser(req.body.id);
    return res.status(200).json(message);
}
let handleCreateNewUser = async(req, res) => {
    let message = await userServices.createNewUser(req.body);
    return res.status(200).json(message);
}
let handleEditUser = async(req,res) => {
    let data = req.body;
    let message = await userServices.updateUserData(data);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleDeleteUser: handleDeleteUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser
}