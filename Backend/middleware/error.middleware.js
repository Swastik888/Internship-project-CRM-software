import { Apierror } from "../utils/Apierror.js";
import "dotenv"

export const Notfound = (req , res , next) => {
    next(new Apierror(404 , `Route not found ${req.method} ${req.originalurl}`))
}


export const errorHandler = (err , req , res , next) => {
    let statusCode = err.statusCode || 500
    let message = err.message || "Internal server error"

    if(err.name === "CastError"){
        statusCode = 400
        message = `Invalid ${err.path} : ${err.value}`
    }

    if(err.code=== 11000){
        statusCode = 409
        const field = Object.keys(err.keyvalue || {})[0] || "field"
        message = `A record with that ${field} already exist`
    }

    if(err.name == "ValidationError"){
        statusCode = 400
        message = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ")
    }

    if(process.env.NODE_ENV !== "production" && statusCode == 500){
        console.error("ERROR : " , err)
    }

    res.status(statusCode).json({
        success : false,
        message ,
        ...(process.env.NODE_ENV !== "production" && statusCode == 500
            ? {stack : err.stack}
            : {}
        )
    })
}

