const { getList, getDetail, newBlog , updateBlog , delBlog} = require('../controller/blog.js')
const {SuccessModel , ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req,res) =>{
    const method = req.method;
    const id = req.query.id
    // const url = req.url;
    // const path = url.split('?')[0]

    //接口1:获取博客list
    if(method === 'GET' && req.path ==='/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author,keyword)
        // return new SuccessModel(listData)
        const result = getList(author,keyword)
        return result.then(listData =>{
            return new SuccessModel(listData)
        })
    }
    //接口2:获取博客详情页
    if(method === 'GET' && req.path === '/api/blog/detail'){
        const data = getDetail(id)
        return new SuccessModel(data)
    }
    //POST
    //接口3:新建一篇博客
    if(method ==='POST' && req.path ==='/api/blog/new'){
        const blogData = req.body
        const data = newBlog(blogData)
        return new SuccessModel(data)
        return {
            msg:'这是新建一篇博客的接口'
        }
    }
    //接口4:更新一篇博客接口
    if(method ==='POST' && req.path === '/api/blog/update'){
        //通过id，更新
        const result = updateBlog(id ,req.body)
        if(result){
            return new SuccessModel('博客更新成功。。。')
        }else{
            return new ErrorModel('博客更新失败。。。')
        }

        return {
            msg:'this is更新一篇博客接口'
        }
    }
    //接口5:删除一篇博客接口
    if(method ==='POST' && req.path === '/api/blog/del'){
        const result = delBlog(id)
        if(result){
            return new SuccessModel('博客删除成功。。。')
        }else{
            return new ErrorModel('博客删除失败。。。')
        }


    }


}

module.exports = handleBlogRouter