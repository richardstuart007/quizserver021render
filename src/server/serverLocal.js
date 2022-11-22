//
//  Libraries
//
const express = require('express')
const { format } = require('date-fns')
//
//  Components
//
const myCorsLocal = require('./../myCors/myCorsLocal')
const myRouterLocal = require('./../myRouter/myRouterLocal')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const moduleName = 'serverLocal'
//
// Constants
//
const { LOCAL_URL_PORT } = require('./serverConstants.js')
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
let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) running on PORT(${LOCAL_URL_PORT})`
app.listen(LOCAL_URL_PORT, () => console.log(logMessage))
