const env = process.env.NODE_ENV //环境变量

//配置
let MYSQL_CONF

if(env === 'dev'){
    MYSQL_CONF = {
        host:'rm-uf6t9m0yx22dxrya5no.mysql.rds.aliyuncs.com',
        user:'myblog',
        password:'passMYblog123',
        port:'3306',
        database:'myblog'
    }
}

if(env === 'production'){
    MYSQL_CONF = {
        host:'rm-uf6t9m0yx22dxrya5no.mysql.rds.aliyuncs.com',
        user:'myblog',
        password:'passMYblog123',
        port:'3306',
        database:'myblog'
    }
}

module.exports = {
    MYSQL_CONF,
}