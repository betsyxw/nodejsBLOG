
//mock数据，博客list
const getList = (author,keyword) =>{
    //先返回mock数据，但是格式要正确
    return [
        {
           id:1,
           title:'bootstrap的UI框架',
           content: '世界で一番人気のあるフロントエンドライブラリ Bootstrap を使って' ,
           createTime:1622878280218,
           author:"徐闻"
        },{
            id:2,
            title:'防止电脑进入锁屏，在家办公神器',
            content: '用IE浏览器打开，改函数只支持IE浏览器。' ,
            createTime:1622878352808,
            author:"张三"
        }
    ]
}

//mock数据，博客详情detail页面
const getDetail = (id) =>{

    return {
        id:1,
        title:'bootstrap的UI框架',
        content: '世界で一番人気のあるフロントエンドライブラリ Bootstrap を使って' ,
        createTime:1622878280218,
        author:"徐闻"
    }
}

//mock,新建博客
const newBlog = (blogData ={}) =>{
    //blogData是一个博客对象
    console.log('newBlog blogData...', blogData)

    return {
        id:3
    }

}

//mock,更新博客，通过id+博客内容
//blogData ={}万一，blogData为空也ok,ES6写法
const updateBlog = (id, blogData ={}) =>{
    //id就是要更新博客的id
    //blogData是一个博客对象
    console.log('updateBlog...', id, blogData)
    return true

}

//mock,delblog删除博客,只需要id
const delBlog = (id)=>{
    //id就要删除博客的id
    return true
}




module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,

}