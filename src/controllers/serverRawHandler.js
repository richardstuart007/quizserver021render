//!==================================================================================
//! Run Raw SQL
//!==================================================================================
//
// Constants
//
const debugLog = false
const moduleName = 'serverRawHandler'
//.................................
//  Object returned by this module
//.................................
const rtnObj = {
  rtnValue: false,
  rtnMessage: '',
  rtnSqlFunction: moduleName,
  rtnCatchFunction: '',
  rtnCatch: false,
  rtnCatchMsg: '',
  rtnRows: []
}
//==================================================================================
//= Main ASYNC Function
//==================================================================================
async function serverRawHandler(db, bodyParms) {
  try {
    //..................................................................................
    //. Parameter Validation
    //..................................................................................
    //
    //  Destructure Parameters
    //
    const { sqlAction, sqlString, sqlTable, sqlWhere, sqlOrderByRaw, sqlRow, sqlKeyName } =
      bodyParms
    if (debugLog) console.log(`module(${moduleName}) sqlAction ${sqlAction}`)
    //
    // Check values sent
    //
    if (!sqlAction) {
      rtnObj.rtnMessage = `SqlAction parameter not passed`
      return rtnObj
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
      rtnObj.rtnMessage = `SqlAction ${sqlAction}: SqlAction not valid`
      return rtnObj
    }
    //
    //  SELECTSQL needs sqlString
    //
    if (sqlAction === 'SELECTSQL' && !sqlString) {
      rtnObj.rtnMessage = `SqlAction ${sqlAction}: sqlString not passed`
      return rtnObj
    }
    //
    //  not SELECTSQL needs table
    //
    if (sqlAction !== 'SELECTSQL' && !sqlTable) {
      rtnObj.rtnMessage = `SqlAction ${sqlAction}: sqlTable not passed`
      return rtnObj
    }
    //
    // Get Database record (ASYNC)
    //
    await sqlDatabase(
      db,
      sqlAction,
      sqlString,
      sqlTable,
      sqlWhere,
      sqlOrderByRaw,
      sqlRow,
      sqlKeyName
    )
    return rtnObj
    //
    // Errors
    //
  } catch (err) {
    console.log(`module(${moduleName}) `, err.message)
    rtnObj.rtnCatch = true
    rtnObj.rtnCatchMsg = err.message
    rtnObj.rtnCatchFunction = moduleName
    return rtnObj
  }
}
//!==================================================================================
//! Main function - Await
//!==================================================================================
async function sqlDatabase(
  db,
  sqlAction,
  sqlString,
  sqlTable,
  sqlWhere,
  sqlOrderByRaw,
  sqlRow,
  sqlKeyName
) {
  //
  // Define Return Variable
  //
  let sqlData
  try {
    switch (sqlAction) {
      case 'SELECTSQL':
        sqlData = await db.select(db.raw(sqlString))
        break
      case 'SELECT':
        if (sqlOrderByRaw) {
          sqlData = await db.select('*').from(sqlTable).whereRaw(sqlWhere).orderByRaw(sqlOrderByRaw)
        } else {
          sqlData = await db.select('*').from(sqlTable).whereRaw(sqlWhere)
        }
        break
      case 'UPDATE':
        sqlData = await db.update(sqlRow).from(sqlTable).whereRaw(sqlWhere).returning(['*'])
        break
      case 'DELETE':
        sqlData = await db.del().from(sqlTable).whereRaw(sqlWhere).returning(['*'])
        break
      case 'INSERT':
        if (sqlKeyName) {
          sqlData = await db
            .insert(sqlRow)
            .into(sqlTable)
            .returning(['*'])
            .onConflict(sqlKeyName)
            .ignore()
        } else {
          sqlData = await db.insert(sqlRow).into(sqlTable).returning(['*'])
        }
        break
      case 'UPSERT':
        sqlData = await db
          .insert(sqlRow)
          .into(sqlTable)
          .returning(['*'])
          .onConflict(sqlKeyName)
          .merge()
        break
    }
    //
    //  No results
    //
    if (!sqlData || !sqlData[0]) {
      rtnObj.rtnMessage = `SqlAction ${sqlAction}: FAILED`
      return
    }
    //
    // Update Return Values
    //
    rtnObj.rtnValue = true
    rtnObj.rtnMessage = `SqlAction ${sqlAction}: SUCCESS`
    rtnObj.rtnRows = sqlData
    return
    //
    // Errors
    //
  } catch (err) {
    console.log(`module(${moduleName}) `, err.message)
    rtnObj.rtnCatch = true
    rtnObj.rtnCatchMsg = err.message
    rtnObj.rtnCatchFunction = moduleName
    return
  }
}
//!==================================================================================
//! Exports
//!==================================================================================
module.exports = {
  serverRawHandler
}
