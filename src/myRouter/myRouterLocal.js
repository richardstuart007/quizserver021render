//
//  Libraries
//
const express = require('express')
const myRouterLocal = express.Router()
const knex = require('knex')
const { format } = require('date-fns')
//
//  Sub components
//
const serverRaw = require('../controllers/serverRaw')
const serverRegister = require('../controllers/serverRegister')
const serverSignin = require('../controllers/serverSignin')
//..............................................................................
//.  Initialisation
//.............................................................................
//
//  Counter
//
let logCounter = 0
const moduleName = 'myRouterLocal'
//
// Constants
//
const {
  LOCAL_KNEX_CLIENT,
  LOCAL_KNEX_HOST,
  LOCAL_KNEX_USER,
  LOCAL_KNEX_PWD,
  LOCAL_KNEX_DATABASE,
  URL_SIGNIN,
  URL_TABLES,
  URL_REGISTER
} = require('./../server/serverConstants.js')
//
// Knex (LOCAL)
//
const db = knex({
  client: LOCAL_KNEX_CLIENT,
  connection: {
    host: LOCAL_KNEX_HOST,
    user: LOCAL_KNEX_USER,
    password: LOCAL_KNEX_PWD,
    database: LOCAL_KNEX_DATABASE
  }
})
//
//  Log setup
//
console.log(
  `module(${moduleName}) Database Connection==> Client(${LOCAL_KNEX_CLIENT}) host(${LOCAL_KNEX_HOST}) user(${LOCAL_KNEX_USER}) database(${LOCAL_KNEX_DATABASE})`
)
//.............................................................................
//.  Routes - Tables
//.............................................................................
myRouterLocal.post(URL_TABLES, (req, res) => {
  logRawTables(req, 'POST', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
})

myRouterLocal.delete(URL_TABLES, (req, res) => {
  logRawTables(req, 'DELETE', 'RAW', 'serverRaw')
  serverRaw.serverRaw(req, res, db, logCounter)
})
//.............................................................................
//.  Routes - Register/SignIn
//.............................................................................
myRouterLocal.post(URL_SIGNIN, (req, res) => {
  logRawSignIn(req, 'POST Signin')
  serverSignin.serverSignin(req, res, db, logCounter)
})

myRouterLocal.post(URL_REGISTER, (req, res) => {
  logRawSignIn(req, 'POST Register')
  serverRegister.serverRegister(req, res, db, logCounter)
})
//.............................................................................
//.  Log the Body to the console
//.............................................................................
function logRawTables(req, fetchAction, fetchRoute, handler) {
  //
  //  Destructure Parameters
  //
  const { sqlClient, sqlAction, sqlString, sqlTable, sqlWhere, sqlOrderByRaw, sqlRow, sqlKeyName } =
    req.body
  //
  //  Timestamp and Counter
  //
  const TimeStamp = format(new Date(), 'yyLLddHHmmss')
  logCounter = logCounter + 1
  //
  //  Format Message & Log
  //
  let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName})`
  if (sqlTable) logMessage = logMessage + ` Table(${sqlTable})`
  logMessage =
    logMessage +
    ` Handler(${handler}) Client(${sqlClient}) Action(${fetchAction}) Route(${fetchRoute}) Sql(${sqlAction})`

  if (sqlString) logMessage = logMessage + ` String(${sqlString})`
  if (sqlWhere) logMessage = logMessage + ` Where(${sqlWhere})`
  if (sqlOrderByRaw) logMessage = logMessage + ` OrderByRaw(${sqlOrderByRaw})`
  if (sqlRow) logMessage = logMessage + ` Row(Data)`
  if (sqlKeyName) logMessage = logMessage + ` KeyName(${sqlKeyName})`

  console.log(logMessage)
}
//.............................................................................
//.  Log the Body to the console
//.............................................................................
function logRawSignIn(req, fetchAction) {
  //
  //  Destructure Parameters
  //
  const { user, name, sqlClient } = req.body
  const { id } = req.params
  //
  //  Counter
  //
  const TimeStamp = format(new Date(), 'yyLLddHHmmss')
  logCounter = logCounter + 1
  //
  // Format message & Log
  //
  let logMessage = `Server.. ${logCounter} Time:${TimeStamp} Module(${moduleName}) sqlClient(${sqlClient}) fetchAction(${fetchAction}) User(${user})`
  if (name) logMessage.concat(` Name(${name})`)
  if (id) logMessage.concat(` ID(${id})`)
  console.log(logMessage)
}
//.............................................................................
module.exports = myRouterLocal
