class ApiError extends Error{

    constructor{
        statusCode,
        message =" Something went wrong",
        erro= [],
        stack =""
    }{
        super(messgae)
        this.statusCode=statusCode
        this.data= null
        thismessage=message
        this.success =false;
        this.errors = errors
        if(stack){
            this.stack =stack
        }
        else {
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}