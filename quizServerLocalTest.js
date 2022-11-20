//
//  Libraries
//
const express = require('express')
const myCorsLocalTest = require('./myCors/myCorsLocalTest')
const myRouterLocalTest = require('./myRouter/myRouterLocalTest')
const { format } = require('date-fns')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const quizserver = 'quizServerLocalTest'
//
// Constants
//
const { LOCAL_URL_PORT_TEST } = require('./quizServerConstants')
//
// Express
//
const app = express()
app.use(express.json())
//
//  Cors Middleware
//
app.options('*', myCorsLocalTest)
app.use(myCorsLocalTest)
//
//  Router
//
app.use(myRouterLocalTest)
//..............................................................................
//.  Start Server
//.............................................................................
const TimeStamp = format(new Date(), 'yyLLddHHmmss')
let logMessage = `SERVER.. ${logCounter} Time:${TimeStamp} QuizServer(${quizserver}) running on PORT(${LOCAL_URL_PORT_TEST})`
app.listen(LOCAL_URL_PORT_TEST, () => console.log(logMessage))
