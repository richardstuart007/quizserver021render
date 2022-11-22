//
//  Libraries
//
const express = require('express')
const { format } = require('date-fns')
//
//  Components
//
const myCorsRemote = require('./../myCors/myCorsRemote')
const myRouterRemote = require('./../myRouter/myRouterRemote')

//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const moduleName = 'serverRemote'
//
// Constants
//
const { REMOTE_URL_PORT } = require('./serverConstants.js')
//
// Express
//
const app = express()
app.use(express.json())
//
//  Cors Middleware
//
app.options('*', myCorsRemote)
app.use(myCorsRemote)
//
//  Router
//
app.use(myRouterRemote)
//..............................................................................
//.  Start Server
//.............................................................................
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) moduleName(${moduleName}) running on PORT(${REMOTE_URL_PORT})`
app.listen(REMOTE_URL_PORT, () => console.log(logMessage))
