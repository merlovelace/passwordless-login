const publicApis = [
    '/login'
]
const url = require('url')
const {verify} = require('jsonwebtoken')


module.exports = async (req, res, next) => {
    let {originalUrl, query} = req


    const parsedUrl = url.parse(originalUrl, true)
    originalUrl = parsedUrl.pathname

    console.log(originalUrl)

    try {
        const filter = publicApis.filter(x => x === originalUrl)
        if (filter.length > 0) {
            console.log(query)
            next()
        }else{
            const token = verify(query.token, process.env.JWT_SECRET)
            if(!token) {
                throw 'TokenNotFound'
            }

            req.token = token
            next()
        }

    } catch (error) {
        res.status(401).send(error)
    }
}