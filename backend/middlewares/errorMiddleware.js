// if the requested api endpoint is not gound
const notFound = (req, res, next) => {
    const error = new Error(`Not found ${req.originalUrl}`)
    res.status(404)
    next(error)
}

// handle the error in any case including the above
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({ 
        message:err.message, 
        stack:process.env.NODE_ENV === 'production' ? null : err.stack 
    })
}

export { notFound, errorHandler }