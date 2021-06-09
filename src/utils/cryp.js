//导入库，crypto是nodejs自带的加密库
const crypto = require('crypto')

//密钥
const SERECT_KEY = 'WEJEFJEAF)_0093'

//md5
function md5(content){
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')

}
//加密函数
function genPassword(password){
    const str = `password=${password}&key=${SERECT_KEY}`
    return md5(str)
}

// const result = genPassword('123')
// console.log('加密后的密码是=>',result)

module.exports={
    genPassword
}
