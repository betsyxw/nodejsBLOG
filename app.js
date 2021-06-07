const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const {get, set} = require('./src/db/redis')
//获取cookie的过期时间
const getCookieExpires = () =>{
  const d = new Date()
  d.setTime(d.getTime()+(24*60*60*1000))
  console.log('d.toGMTString() is:', d.toGMTString())
  return d.toGMTString()
}

//session数据
// const SESSION_DATA = {}


//用于处理postdata,这里=js的callback，用原生自带promise函数.then
const getPostData = (req) => {
  const promise = new Promise((resolve, reject)=>{
      if(req.method !== 'POST'){
        resolve({})
        return
      }
      if(req.headers['content-type'] !== 'application/json'){
        resolve({})
        return
      }
      let postData = ''
      req.on('data', chunk =>{
        postData += chunk.toString()
      })
      req.on('end',()=>{
        if(!postData){
          resolve({})
          return
        }
        resolve(JSON.parse(postData))
      })
  })
  return promise

}


const serverHandle = (req,res)=>{
  //设置返回格式，JSON,后端提供的数据肯定是json格式的，restful开发
  res.setHeader('Content-type','application/json')

  //抽取公共类path
  const url = req.url;
  req.path = url.split('?')[0]

  //解析query,url后半部分
  req.query = querystring.parse(url.split('?')[1])

  //解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || '' //k1=v1;k2=v2
  cookieStr.split(';').forEach(item =>{
    if(!item){
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })
  console.log('req.cookie is:',req.cookie)


  //解析session
  //有userid不需要设置session，needSetCookie
  // let needSetCookie = false
  // let userId = req.cookie.userid
  // console.log('第一层：userid=>',userId)
  // if(userId){
  //   if(!SESSION_DATA[userId]){
  //     SESSION_DATA[userId] ={}
  //   }
  // }else{
  //   needSetCookie = true
  //   //如果没有获取的到userId就给个时间磋，赋值
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  //   console.log('session第二层：userid=>',userId)
  // }
  // req.session = SESSION_DATA[userId]
  // console.log('session第三层：userid:=>',userId)
  // console.log('needSetCookie:is=>',needSetCookie)

  //redis=>解析session，最后存入redis
  let needSetCookie = false
  let userId = req.cookie.userid
  if(!userId){
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    //初始化redis 中session值
    set(userId,{})
  }
  //获取session
  req.sessionId = userId
  get(req.sessionId).then(sessionData =>{
    if(sessionData == null){
      //初始化redis 中session值
      set(req.sessionId, {})
      //设置session
      req.session = {}
    }else{
      req.session = sessionData
    }
    console.log('res.session=>',req.session)
    //处理post data
    return getPostData(req)
  })
  //处理路由之前，先解析post data
.then(postData =>{
    req.body = postData
      //处理blog文件的路由
      //方法一：
      // const blogData = handleBlogRouter(req,res)
      // if(blogData){
      //   res.end(
      //     JSON.stringify(blogData)
      //   )
      //   return
      // }

      //方法二：返回promise
    const blogResult = handleBlogRouter(req,res)
    if(blogResult){
      blogResult.then(blogData =>{
        //session--
        if(needSetCookie){
          res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }

        res.end(
          JSON.stringify(blogData)
        )
      })
      return 
    }


    //处理User路由
    // const userData = handleUserRouter(req,res)
    // if(userData){
    //   res.end(
    //     JSON.stringify(userData)
    //     )
    //     return
    // }
    const userResult = handleUserRouter(req,res)
    if(userResult){
      userResult.then(userData =>{
        //session--,如果需要设置cookie，在这里把cookie，set上
        if(needSetCookie){
          res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }

        res.end(JSON.stringify(userData))
      })
      return
    }

    //路由一个都没有命中，返回404,还需要修改type
    res.writeHead(404,{"Content-type":"text/plain"})
    res.write("404 NOT FOUND\n")
    res.end()

  })

  

}

module.exports = serverHandle

//process.env.NODE_ENV