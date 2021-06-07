const {exec, escape } = require('../db/mysql')

//escape方式SQL注入
const login = (username,password)=>{
    username = escape(username)
    password = escape(password)
    const sql = `SELECT username,realname FROM users WHERE username=${username} and password=${password}`
    return exec(sql).then(rows =>{
        return rows[0] || {}
    })
}



module.exports = {
    login,
}



