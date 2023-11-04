import colors from "colors";

const ErrorHandler = (err, req, res, next) => {
    console.log(colors.bgRed("Middleware Error Hadnling"));
    console.log(colors.bgMagenta(err.stack));
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

export default ErrorHandler