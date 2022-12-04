//==================================================================================
//= Process a RAW fetch request from server route
//==================================================================================
const { format } = require('date-fns')
const serverRawHandler = require('./serverRawHandler')
//
// Constants
//
const debugLog = false
const moduleName = 'serverRaw'
//
//  Object returned by this handler
//
let rtnObj = {
  rtnValue: false,
  rtnMessage: '',
  rtnSqlFunction: moduleName,
  rtnCatchFunction: '',
  rtnCatch: false,
  rtnCatchMsg: '',
  rtnRows: []
}
//==================================================================================
//= Get a row from a table : table, keyName, keyValue are passed in Body
//==================================================================================
async function serverRaw(req, res, db, logCounter) {
  //
  //  Time Stamp
  //
  const TimeStamp = format(new Date(), 'yyLLddHHmmss')
  let logMessage = `Handler. ${logCounter} Time:${TimeStamp} Module(${moduleName})`
  try {
    //
    //  Initialise Values
    //
    rtnObj.rtnValue = false
    rtnObj.rtnMessage = ''
    rtnObj.rtnSqlFunction = moduleName
    rtnObj.rtnCatchFunction = ''
    rtnObj.rtnCatch = false
    rtnObj.rtnCatchMsg = ''
    rtnObj.rtnRows = []
    //..................................................................................
    //. Check values sent in Body
    //..................................................................................
    const bodyParms = req.body
    //
    //  Action type not sent
    //
    const { sqlAction, sqlTable } = bodyParms
    //
    //  Table/Action to message
    //
    logMessage = logMessage + ` Table(${sqlTable}) ${sqlAction}`
    //
    //  Check Action passed
    //
    if (!sqlAction) {
      rtnObj.rtnMessage = `sqlAction not sent as Body Parameters`
      return res.status(400).json(rtnObj)
    }
    //
    //  Validate sqlAction type
    //
    if (
      sqlAction !== 'DELETE' &&
      sqlAction !== 'EXIST' &&
      sqlAction !== 'SELECTSQL' &&
      sqlAction !== 'SELECT' &&
      sqlAction !== 'INSERT' &&
      sqlAction !== 'UPDATE' &&
      sqlAction !== 'UPSERT'
    ) {
      rtnObj.rtnMessage = `sqlAction ${sqlAction}: sqlAction not valid`
      return res.status(400).json(rtnObj)
    }
    //
    // Process Request Promises(ALL)
    //
    const returnData = await Promise.all([serverRawHandler.serverRawHandler(db, bodyParms)])
    //
    // Parse Results
    //
    const returnDataObject = returnData[0]
    rtnObj = Object.assign({}, returnDataObject)
    //
    //  Return values
    //
    if (debugLog) {
      console.log(`HANDLER. ${logCounter} Time:${TimeStamp} Module(${moduleName}) ${rtnObj}`)
    }
    const rtnValue = rtnObj.rtnValue
    if (!rtnValue) {
      if (debugLog)
        console.log(
          `HANDLER. ${logCounter} Time:${TimeStamp} Module(${moduleName}) Module ${moduleName} received No Data`
        )
    }
    //
    //  Log return values
    //
    const records = Object.keys(rtnObj.rtnRows).length
    logMessage = logMessage + `(${records})`
    console.log(logMessage)
    return res.status(200).json(rtnObj)
    //
    // Errors
    //
  } catch (err) {
    logMessage = logMessage + ` Error(${err.message})`
    console.log(logMessage)
    rtnObj.rtnCatch = true
    rtnObj.rtnCatchMsg = err.message
    rtnObj.rtnCatchFunction = moduleName
    return res.status(400).json(rtnObj)
  }
}
//!==================================================================================
//! Exports
//!==================================================================================
module.exports = {
  serverRaw
}
