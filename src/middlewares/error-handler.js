const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.json({
        status: {
            statusCode,
            statusMessage: error.message,
            errorStack: error.stack
        }
    });
};

module.exports = errorHandler;
