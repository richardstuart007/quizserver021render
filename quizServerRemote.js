//
//  Libraries
//
const express = require('express')
const myCorsRemote = require('./myCors/myCorsRemote')
const myRouterRemote = require('./myRouter/myRouterRemote')
const { format } = require('date-fns')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const quizserver = 'quizServerRemote'
//
// Constants
//
const { REMOTE_URL_PORT } = require('./quizServerConstants')
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
let logMessage = `SERVER.. ${logCounter} Time:${TimeStamp} QuizServer(${quizserver}) running on PORT(${REMOTE_URL_PORT})`
app.listen(REMOTE_URL_PORT, () => console.log(logMessage))
