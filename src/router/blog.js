const { getList, getDetail } = require('../controller/blog.js')
const {SuccessModel , ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req,res) =>{
    const method = req.method;
    // const url = req.url;
    // const path = url.split('?')[0]

    //接口1:获取博客list
    if(method === 'GET' && req.path ==='/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author,keyword)
        return new SuccessModel(listData)
    }
    //接口2:获取博客详情页
    if(method === 'GET' && req.path === '/api/blog/detail'){
        const id = req.query.id
        const data = getDetail(id)
        return new SuccessModel(data)
    }
    //POST
    //接口3:新建一篇博客
    if(method ==='POST' && req.path ==='/api/blog/new'){
        return {
            msg:'这是新建一篇博客的接口'
        }
    }
    //接口4:更新一篇博客接口
    if(method ==='POST' && req.path === '/api/blog/update'){
        return {
            msg:'this is更新一篇博客接口'
        }
    }
    //接口5:删除一篇博客接口
    if(method ==='POST' && req.path === '/api/blog/del'){
        return {
            msg:'this is 删除一篇博客接口'
        }
    }


}

module.exports = handleBlogRouter