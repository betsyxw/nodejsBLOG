
const loginCheck = (username,password)=>{
    //mock假数据
    if(username === 'zhangsan' && password ==='123'){
        return true
    }
    return false

}


//mock


module.exports = {
    loginCheck,
}



