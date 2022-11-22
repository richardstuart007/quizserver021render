//==================================================================================
//= Process a REGISTER fetch request from server route
//==================================================================================
const { format } = require('date-fns')
const serverRegisterHandler = require('./serverRegisterHandler')
//
// Constants
//
const debugLog = false
const moduleName = 'serverRegister'
//
//  Global Variable - Define return object
//
const CatchFunction = 'serverRegister'
let rtnObj = {
  rtnValue: '',
  rtnMessage: '',
  rtnSqlFunction: moduleName,
  rtnCatchFunction: '',
  rtnCatch: false,
  rtnCatchMsg: '',
  rtnRows: []
}
//==================================================================================
//= Register a User
//==================================================================================
async function serverRegister(req, res, db, logCounter) {
  //
  //  Time Stamp
  //
  const TimeStamp = format(new Date(), 'yyLLddHHmmss')
  let logMessage = `Handler. ${logCounter} Time:${TimeStamp} Module(${moduleName})`

  try {
    //..................................................................................
    //. Check values sent in Body
    //..................................................................................
    const bodyParms = req.body
    const { user, email, name, password } = bodyParms
    //
    //  Check required parameters
    //
    if (!user || !email || !name || !password) {
      rtnObj.rtnMessage = `User or Email or Name or Password empty`
      rtnObj.rtnCatchFunction = CatchFunction
      return res.status(400).json(rtnObj)
    }
    //
    // Process Request Promises(ALL)
    //
    const returnData = await Promise.all([
      serverRegisterHandler.serverRegisterHandler(db, bodyParms)
    ])
    if (debugLog) console.log(`module(${moduleName}) returnData `, returnData)
    //
    // Parse Results
    //
    const returnDataObject = returnData[0]
    rtnObj = Object.assign({}, returnDataObject)
    //
    //  Error
    //
    const rtnValue = rtnObj.rtnValue
    if (!rtnValue) {
      //
      //  Catch message / Error message
      //
      if (debugLog) {
        let message
        rtnObj.rtnCatch ? (message = rtnObj.rtnCatchMsg) : (message = rtnObj.rtnMessage)
        console.log(
          `Handler. ${logCounter} Time:${TimeStamp} Module(${moduleName}) message(${message})`
        )
      }
      return res.status(220).send(rtnObj)
    }
    //
    //  Log return values
    //
    const records = Object.keys(rtnObj.rtnRows).length
    logMessage = logMessage + ` records(${records})`
    console.log(logMessage)
    if (debugLog)
      console.log(
        `Handler. ${logCounter} Time:${TimeStamp} Module(${moduleName}) records(${records})`
      )
    return res.status(200).json(rtnObj)
    //
    // Errors
    //
  } catch (err) {
    logMessage = logMessage + ` Error(${err.message})`
    rtnObj.rtnCatch = true
    rtnObj.rtnCatchMsg = err.message
    rtnObj.rtnCatchFunction = CatchFunction
    if (debugLog)
      console.log(
        `Handler. ${logCounter} Time:${TimeStamp} Module(${moduleName}) message(${rtnObj})`
      )
    return res.status(400).send(rtnObj)
  }
}
//!==================================================================================
//! Exports
//!==================================================================================
module.exports = {
  serverRegister
}
