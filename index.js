const app = require('./app')
const http = require('http')
const surver = http.createServer(app)
require('dotenv').config()


const PORT = process.env.PORT
const HOST = process.env.HOST

surver.listen(PORT,HOST,function(){
    console.log(`server started http://${HOST}:${PORT}`)
})


