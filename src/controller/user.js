const {exec, escape } = require('../db/mysql')
const {genPassword} = require('../utils/cryp')
//escape方式SQL注入
const login = (username,password)=>{
    username = escape(username)
    //生成加密密码
    password = genPassword(password)
    password = escape(password)

    const sql = `SELECT username,realname FROM users WHERE username=${username} and password=${password}`
    console.log('sql is',sql)
    return exec(sql).then(rows =>{
        return rows[0] || {}
    })
}



module.exports = {
    login,
}



