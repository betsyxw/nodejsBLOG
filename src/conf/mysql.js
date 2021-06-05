const mysql = require('mysql');

//创建连接对象
//阿里云
const con = mysql.createConnection({
    host:'rm-uf6t9m0yx22dxrya5no.mysql.rds.aliyuncs.com',
    user:'myblog',
    password:'passMYblog123',
    port:'3306',
    database:'myblog'
})


//开始连接
con.connect()

//执行sql语句
const sql = 'select * from users;'
con.query(sql, (err,result)=>{
    if(err){
        console.error(err)
        return
    }
    console.log(result)
})

//关闭连接
con.end()