const {loginCheck} = require('../controller/user.js') 
const {SuccessModel , ErrorModel} = require('../model/resModel')


const handleUserRouter = (req,res) =>{
    const method = req.method
    // const url = req.url
    // const path = url.split('?')[0]

    //登陆接口
    if(method === 'POST' && req.path === '/api/user/login'){
        const {username,password} = req.body
        const result = loginCheck(username,password)
        if(result){
            return new SuccessModel('登陆成功!!!')
        }else{
            return new ErrorModel('登陆失败!!!')
        }

    }

}

module.exports = handleUserRouter