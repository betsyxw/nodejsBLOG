const handleUserRouter = (req,res) =>{
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0]

    //登陆接口
    if(method === 'POST' && path === 'api/user/login'){
        return {
            msg:'this is 登陆接口'
        }

    }

}

module.exports = handleUserRouter