import dotenv from 'dotenv';
dotenv.config();
// const NODE_ENV = 'development';

const notFound =(req,res,next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (req,res,next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    

    if(err.name === 'CastError' && err.kind === 'ObjectId'){
    statusCode = 404;

    message = 'Resource not found' ;
}

res.status(statusCode).Json({
    message,
    stack: process.env.NODE_ENV === 'production'? null : err.stack
});
}

export {
    notFound,
    errorHandler
}