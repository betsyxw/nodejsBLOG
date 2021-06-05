const handleBlogRouter = (req,res) =>{
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0]

    //接口1:获取博客list
    if(method === 'GET' && path ==='/api/blog/list'){
        return {
            msg:'这是获取博客列表的接口'
        }
    }
    //接口2:获取博客详情页
    if(method === 'GET' && path === '/api/blog/detail'){
        return {
            msg:'这是获取博客详情页的接口'
        }
    }
    //接口3:新建一篇博客
    if(method ==='POST' && path ==='/api/blog/new'){
        return {
            msg:'这是新建一篇博客的接口'
        }
    }
    //接口4:更新一篇博客接口
    if(method ==='POST' && path === '/api/blog/update'){
        return {
            msg:'this is更新一篇博客接口'
        }
    }
    //接口5:删除一篇博客接口
    if(method ==='POST' && path === '/api/blog/del'){
        return {
            msg:'this is 删除一篇博客接口'
        }
    }


}

module.exports = handleBlogRouter