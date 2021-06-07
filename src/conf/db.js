const env = process.env.NODE_ENV //环境变量

//配置
let MYSQL_CONF
let REDIS_CONF

if(env === 'dev'){
    MYSQL_CONF = {
        host:'rm-uf6t9m0yx22dxrya5no.mysql.rds.aliyuncs.com',
        user:'myblog',
        password:'passMYblog123',
        port:'3306',
        database:'myblog'
    },
    //redis存session
    REDIS_CONF={
        port: 6379,
        host: '127.0.0.1'
    }
}

if(env === 'production'){
    MYSQL_CONF = {
        host:'rm-uf6t9m0yx22dxrya5no.mysql.rds.aliyuncs.com',
        user:'myblog',
        password:'passMYblog123',
        port:'3306',
        database:'myblog'
    },
    //redis存session
    REDIS_CONF={
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}