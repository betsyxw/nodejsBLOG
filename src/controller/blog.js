const xss = require('xss')
const { exec } = require('../db/mysql')


//mock数据，博客list,刚开始写接口，使用mock数据，测试是否通。之后改成云数据mysql。
const getList = (author,keyword) =>{
    let sql = `SELECT * FROM blogs WHERE 1=1 `
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `ORDER BY createtime desc;`

    //返回的是promise
    return exec(sql)

}

//mock数据，博客详情detail页面
const getDetail = (id) =>{
    const sql = `SELECT * FROM blogs WHERE id='${id}'`
    return exec(sql).then(row =>{
        //异步，让查询结果的数组，变成对象
        return row[0]
    })
}

//mock,新建博客
const newBlog = (blogData ={}) =>{
    //blogData是一个博客对象(title,content,author)+新建博客=插入到数据表里的id
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createTime = Date.now()

    const sql = `
        INSERT INTO blogs (title,content,createtime,author) 
        VALUES('${title}','${content}','${createTime}','${author}');
    `
    return exec(sql).then(insertData =>{
        //console.log('insertData is:'+ insertData)
        return {
            id: insertData.insertId
        }
    })

}

//mock,更新博客，通过id+博客内容
//blogData ={}万一，blogData为空也ok,ES6写法
const updateBlog = (id, blogData ={}) =>{
    //id就是要更新博客的id
    //blogData是一个博客对象
    const title = xss(blogData.title)
    const content = xss(blogData.content)

    const sql = `UPDATE blogs SET title='${title}' , content ='${content}' WHERE id=${id}`
    return exec(sql).then(updateData =>{
        console.log('updateData is :'+ updateData)
        if(updateData.affectedRows>0){
            return true
        }
        return false
    })

}

//mock,delblog删除博客,只需要id
const delBlog = (id, author)=>{
    //id就要删除博客的id
    const sql = `DELETE FROM blogs WHERE id = '${id}' and author = '${author}'`
    return exec(sql).then(deleteData =>{
        console.log('deleteData is :'+ deleteData)
        if(deleteData.affectedRows>0){
            return true
        }
        return false
    })
}




module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,

}