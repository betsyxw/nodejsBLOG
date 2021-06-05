const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req,res)=>{
  //设置返回格式，JSON,后端提供的数据肯定是json格式的，restful开发
  res.setHeader('Content-type','application/json')

  //处理blog文件的路由
  const blogData = handleBlogRouter(req,res)
  if(blogData){
    res.end(
      JSON.stringify(blogData)
    )
    return
  }

  //处理User路由
  const UserData = handleUserRouter(req,res)
  if(UserData){
    res.end(
      JSON.stringify(UserData)
      )
      return
  }

  //路由一个都没有命中，返回404,还需要修改type
  res.writeHead(404,{"Content-type":"text/plain"})
  res.write("404 NOT FOUND\n")
  res.end()

}

module.exports = serverHandle

//process.env.NODE_ENV