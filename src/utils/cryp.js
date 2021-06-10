//导入库，crypto是nodejs自带的加密库
const crypto = require('crypto')

//密钥
const SECRET_KEY = 'WEF)_0093'

//md5
function md5(content){
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')

}
//加密函数
function genPassword(password){
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

const result = genPassword('123')
console.log('加密后的密码是=>',result)
//123==94f1abcf82cf6f57e13c1b1a7f48b057
module.exports={
    genPassword
}
