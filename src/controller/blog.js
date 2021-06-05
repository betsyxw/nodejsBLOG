
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

module.exports = {
    getList,
    getDetail,
}