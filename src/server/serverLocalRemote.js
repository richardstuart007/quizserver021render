//
//  Libraries
//
const express = require('express')
const { format } = require('date-fns')
//
//  Components
//
const myCorsLocalRemote = require('./../myCors/myCorsLocalRemote')
const myRouterLocalRemote = require('./../myRouter/myRouterLocalRemote')

//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const serverName = 'serverLocalRemote'
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
app.options('*', myCorsLocalRemote)
app.use(myCorsLocalRemote)
//
//  Router
//
app.use(myRouterLocalRemote)
//..............................................................................
//.  Start Server
//.............................................................................
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) serverName(${serverName}) running on PORT(${REMOTE_URL_PORT})`
app.listen(REMOTE_URL_PORT, () => console.log(logMessage))
