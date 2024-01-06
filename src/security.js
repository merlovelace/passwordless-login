const publicApis = [
    '/login'
]
const url = require('url')
const jwt = require('jsonwebtoken')


module.exports = async (req, res, next) => {
    let {originalUrl, query, headers} = req
    let { authorization } = headers


    const parsedUrl = url.parse(originalUrl, true)
    originalUrl = parsedUrl.pathname

    console.log(originalUrl)

    try {
        const filter = publicApis.filter(x => x === originalUrl)
        if (filter.length > 0) {
            console.log(query)
            next()
        }else if(originalUrl === '/magic'){
            const token = jwt.verify(query.token, process.env.JWT_SECRET)
            if(!token) {
                throw 'TokenNotFound'
            }

            const magicModel = require('./models/magic')
            const magicInfo = await magicModel.findOne({
                email: token.email,
                magicId: token.id,
                isSuccess: false,
                isError: false
            })
            if(!magicInfo){
                throw 'MagicNotFound'
            }

            if(magicInfo.expired < new Date()){
                await magicModel.update({ isError: true }, {
                    where: {
                        id: magicInfo.id
                    },
                });
                throw 'ExpiredMagic'
            }

            const userModel = require('./models/user')
            const userInfo = await userModel.findOne({
                where: {
                    email: magicInfo.email
                }
            })
            if(!userInfo){
                throw 'UserNotFound'
            }

            req.token = token
            req.user = userInfo
            next()
        }else{
            const bearer = authorization.split(' ')
            if (bearer.length !== 2) {
                throw 'BadBearerToken'
            }

            const token = bearer[1]
            const userInfo = await jwt.verify(token, process.env.JWT_SECRET)
            if (!userInfo) {
                throw 'TokenNotFound'
            }

            const userModel = require('./models/user')
            const isUserExist = await userModel.findOne({
                  where: {
                      id: userInfo.id
                  }
              })

            const currentUser = isUserExist

            req.token = token
            req.user = currentUser

        }

    } catch (error) {
        res.status(401).send(error)
    }
}