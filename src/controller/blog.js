const { exec } = require('../db/mysql')


//mock数据，博客list,刚开始写接口，使用mock数据，测试是否通。之后改成云数据mysql。
const getList = (author,keyword) =>{
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    //返回的是promise
    return exec(sql)

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