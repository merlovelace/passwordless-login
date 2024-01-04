const publicApis = [
    '/authenticate_user'
]
const url = require('url')


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
        }
    } catch (error) {
        res.status(401).send(error)
    }
}