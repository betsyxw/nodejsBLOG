const { getList, getDetail, newBlog , updateBlog , delBlog} = require('../controller/blog.js')
const {SuccessModel , ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req,res) =>{
    const method = req.method;
    const id = req.query.id
    // const url = req.url;
    // const path = url.split('?')[0]

    //统一的登陆验证函数,特别是更新博客，发布博客，删除博客，第一步判断用户是否登陆
    const loginCheck = (req) =>{
        if(!req.session.username){
            return Promise.resolve(new ErrorModel('尚未登陆!!!'))
        }
        
    }

    //接口1:获取博客list
    if(method === 'GET' && req.path ==='/api/blog/list'){
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        //管理员界面
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            //返回有值，=未登陆
            return loginCheckResult
        }
        author = req.session.username
        // const listData = getList(author,keyword)
        // return new SuccessModel(listData)
        const result = getList(author,keyword)
        return result.then(listData =>{
            return new SuccessModel(listData)
        })
    }
    //接口2:获取博客详情页=>id
    if(method === 'GET' && req.path === '/api/blog/detail'){
        // const data = getDetail(id)
        // return new SuccessModel(data)
        const result = getDetail(id)
        return result.then(data =>{
            return new SuccessModel(data)
        })

    }
    //POST
    //接口3:新建一篇博客=>id,body
    if(method ==='POST' && req.path ==='/api/blog/new'){
        // const blogData = req.body
        // const data = newBlog(blogData)
        // return new SuccessModel(data)
        // return {
        //     msg:'这是新建一篇博客的接口'
        // }
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            //返回有值，=未登陆
            return loginCheckResult
        }
        req.body.author = req.session.username
        //'zhangsan'//更新博客是登陆状态,假数据，等待后续开发
        const result = newBlog(req.body)
        return result.then(data =>{
            return new SuccessModel(data)
        })

    }
    //接口4:更新一篇博客接口=>id,body
    if(method ==='POST' && req.path === '/api/blog/update'){
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            //返回有值，=未登陆
            return loginCheckResult
        }
        //通过id，更新
        const result = updateBlog(id ,req.body)
        return result.then(val =>{
            if(val){
                return new SuccessModel('博客更新成功。。。')
            }else{
                return new ErrorModel('博客更新失败。。。')
            }
        })
    }
    //接口5:删除一篇博客接口=>id+author
    if(method ==='POST' && req.path === '/api/blog/del'){
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            //返回有值，=未登陆
            return loginCheckResult
        }
        const author = req.session.username
        //'zhangsan'//更新博客是登陆状态,假数据，等待后续开发
        const result = delBlog(id,author)
        return result.then(val =>{
            if(val){
                return new SuccessModel('博客删除成功。。。')
            }else{
                return new ErrorModel('博客删除失败。。。')
            }
        })
        

    }


}

module.exports = handleBlogRouter