const {login} = require('../controller/user.js') 
const {SuccessModel , ErrorModel} = require('../model/resModel')

//获取cookie的过期时间
// const getCookieExpires = () =>{
//     const d = new Date()
//     d.setTime(d.getTime()+(24*60*60*1000))
//     console.log('d.toGMTString() is',d.toGMTString())
//     return d.toGMTString()
// }

const handleUserRouter = (req,res) =>{
    const method = req.method
    // const url = req.url
    // const path = url.split('?')[0]

    //登陆接口
    if(method === 'GET' && req.path === '/api/user/login'){
        //const {username,password} = req.body
        const {username ,password} = req.query
        const result = login(username,password)
        return result.then(data => {
            if(data.username){
                //操作cookie
                //res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                //设置session
                req.session.username = data.username
                req.session.realname = data.realname
                console.log('req.session is=>', req.session)
                return new SuccessModel({
                    username: req.session.username
                })
            }
            return new ErrorModel('登陆失败!!!')
        })
    }
    //登陆验证测试
    if(method === 'GET' && req.path === '/api/user/login-test'){
        if(req.session.username){
            return Promise.resolve(new SuccessModel({session: req.session},'登陆成功！'))
        }
        return Promise.resolve(new ErrorModel('尚未登陆!!!'))
    }

}

module.exports = handleUserRouter