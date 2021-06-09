const fs = require('fs')
const readline = require('readline')
const path = require('path')
const { access } = require('./log')

//文件名
const fileName = path.join(__dirname, '../','../','logs','access.log')
//创建read Stream
const readStream = fs.createReadStream(fileName)

//创建readline对象
const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0
let sum = 0

//一行一行读取
rl.on('line',(lineData)=>{
    if(!lineData){
        return
    }
    sum++
    const arr = lineData.split(' -- ')
    if(arr[2] && arr[2].indexOf('Chrome')>0){
        chromeNum ++
    }
})

//监听完毕
rl.on('close',()=>{
    console.log('chrome浏览器占比：',chromeNum / sum)
})