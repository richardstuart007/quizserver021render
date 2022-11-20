//
//  Libraries
//
const express = require('express')
const myCorsLocal = require('./myCors/myCorsLocal')
const myRouterLocal = require('./myRouter/myRouterLocal')
const { format } = require('date-fns')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const serverName = 'serverLocal'
//
// Constants
//
const { LOCAL_URL_PORT } = require('./serverConstants')
//
// Express
//
const app = express()
app.use(express.json())
//
//  Cors Middleware
//
app.options('*', myCorsLocal)
app.use(myCorsLocal)
//
//  Router
//
app.use(myRouterLocal)
//..............................................................................
//.  Start Server
//.............................................................................
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `SERVER.. ${logCounter} Time:${TimeStamp} serverName(${serverName}) running on PORT(${LOCAL_URL_PORT})`
app.listen(LOCAL_URL_PORT, () => console.log(logMessage))
