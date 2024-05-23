 const errorHandler = (err,req,res,next)=>{
    //if response comes wit  the status code show either status Code or Bad request
     //server error is 500 error
    const statusCode = res.statusCode ? res.statusCode  :  500;
    //set the statusCode
    res.status(statusCode);

    //Sending information to the developer for where the error is coming from
     //Property message will specify the type of the message that will be sent to the developer
     //and the property stack will show on which line the error has happened
     //All the information are sensitively hidden from the user
     res.json({
         message:err.message,
         stack: process.env.NODE_ENV ==="development" ? err.stack : null,
     })


 }

 module.exports = errorHandler;