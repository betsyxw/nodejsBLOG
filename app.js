const serverHandle = (req,res)=>{
  //设置返回格式，JSON,后端提供的数据肯定是json格式的，restful开发
  res.setHeader('Content-type','application/json')


}

module.exports = serverHandle

//process.env.NODE_ENV