const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

//创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

//开始连接
con.connect()

//sql语句
//一个统一的函数
function exec(sql){
    //异步promise
    const promise = new Promise((resolve,reject)=>{
        con.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise

}

//关闭,不能关闭，因为异步是多次请求，不能close


module.exports = {
    exec
}



