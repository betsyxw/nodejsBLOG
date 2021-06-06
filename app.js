const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

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

  //处理路由之前，先解析post data
  getPostData(req).then(postData =>{
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