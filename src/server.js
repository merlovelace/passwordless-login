require('dotenv').config()
const express = require('express')()


const cors = require('cors')
express.use(cors({origin: '*'}))


const {json} = require('body-parser')
express.use(json({limit: '50kb'}))

const security = require('./security')
express.post('/magic', security,  (req,res) => {
    res.send({response: 'Hi'})
})


express.listen(8058, () => {
    console.log('----------------------------------------------')
    console.log(`Passwordless Login Backend Running! Port: 8058`)
    console.log(`Start Date: ${new Date()}`)
    console.log('----------------------------------------------')
})
