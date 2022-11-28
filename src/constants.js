//------------------------------------------------------------------------
//  Database (Remote 1)
//------------------------------------------------------------------------
exports.REMOTE_KNEX_CLIENT1 = 'pg'
exports.REMOTE_KNEX_PORT1 = 5432
exports.REMOTE_KNEX_HOST1 = 'rosie.db.elephantsql.com'
exports.REMOTE_KNEX_USER1 = 'wdscnzxj'
exports.REMOTE_KNEX_PWD1 = 'O-7H6IKT6Hhi_xGU7J_rHSBjvbNO218s'
exports.REMOTE_KNEX_DATABASE1 = 'wdscnzxj'
//------------------------------------------------------------------------
//  Database (Remote 2)
//------------------------------------------------------------------------
exports.REMOTE_KNEX_CLIENT2 = 'pg'
exports.REMOTE_KNEX_PORT2 = 5432
exports.REMOTE_KNEX_HOST2 = 'rosie.db.elephantsql.com'
exports.REMOTE_KNEX_USER2 = 'wdscnzxj'
exports.REMOTE_KNEX_PWD2 = 'O-7H6IKT6Hhi_xGU7J_rHSBjvbNO218s'
exports.REMOTE_KNEX_DATABASE2 = 'wdscnzxj'
//------------------------------------------------------------------------
//  Database (Local 6)
//------------------------------------------------------------------------
exports.LOCAL_KNEX_CLIENT6 = 'pg'
exports.LOCAL_KNEX_HOST6 = '127.0.0.1'
exports.LOCAL_KNEX_USER6 = 'richa'
exports.LOCAL_KNEX_PWD6 = 'london'
exports.LOCAL_KNEX_DATABASE6 = 'Bridge6'
//------------------------------------------------------------------------
//  Database (Local 7)
//------------------------------------------------------------------------
exports.LOCAL_KNEX_CLIENT7 = 'pg'
exports.LOCAL_KNEX_HOST7 = '127.0.0.1'
exports.LOCAL_KNEX_USER7 = 'richa'
exports.LOCAL_KNEX_PWD7 = 'london'
exports.LOCAL_KNEX_DATABASE7 = 'Bridge7'
//------------------------------------------------------------------------
//  PORTS
//------------------------------------------------------------------------
exports.PORT_REM_REM1 = 1011
exports.PORT_REM_REM2 = 1022
exports.PORT_LOC_REM1 = 1101
exports.PORT_LOC_REM2 = 1202
exports.PORT_LOC_LOC6 = 1606
exports.PORT_LOC_LOC7 = 1707
//---------------------------------------------------------------------
//  corsWhitelist
//---------------------------------------------------------------------
exports.CORS_WHITELIST_SRVREM_DBREM1 = [
  'https://quizclient021render.onrender.com', // quiz, remote, remote server, remote DB
  'https://quizdataentry021render.onrender.com' // data, remote, remote server, remote DB
]
exports.CORS_WHITELIST_SRVLOC_DBREM1 = [
  'http://localhost:3101', // quiz, local server 1, remote DB 1
  'http://localhost:2101' // data, local server 1, remote DB 1
]
exports.CORS_WHITELIST_SRVLOC_DBREM2 = [
  'http://localhost:3202', // quiz, local server 2, remote DB 2
  'http://localhost:2202' // data, local server 2, remote DB 2
]
exports.CORS_WHITELIST_SRVLOC_DBLOC6 = [
  'http://localhost:3606', // quiz, local server 6, local DB 6
  'http://localhost:2606' // data, local server 6, local DB 6
]
exports.CORS_WHITELIST_SRVLOC_DBLOC7 = [
  'http://localhost:3707', // quiz, local server 7, local DB 7
  'http://localhost:2707' // data, local server 7, local DB 7
]
//------------------------------------------------------------------------
//  URL
//------------------------------------------------------------------------
exports.URL_TABLES = '/QuizTables'
exports.URL_REGISTER = '/QuizRegister'
exports.URL_SIGNIN = '/QuizSignin'
