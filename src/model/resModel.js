class BaseModel {
    constructor(data,message){
        if(typeof data === 'string'){
            this.message = data
            data = null
            message = null
        }
        if(data){
            this.data = data
        }
        if(message){
            this.message = message
        }
    }
}

//继承自baseModel，super调用执行父类,来自爸爸的功能
class SuccessModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.errno = 0
    }

}

//继承自baseModel，super调用执行父类,来自爸爸的功能
class ErrorModel extends BaseModel {
    constructor(data,message){
        super(data,message)
        this.errno = -1
    }
}

modules.exports = {
    SuccessModel,
    ErrorModel
}