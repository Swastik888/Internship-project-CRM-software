export class Apierror extends Error{
    constructor(statuscode , message){
        super(message)
        this.statuscode = statuscode
        this.isOperational = true
        Error.captureStackTrace?.(this , this.constructor)
    }
}