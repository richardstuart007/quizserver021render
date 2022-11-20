const myCorsLocalRemote = require('cors')
const debugLog = false
//
// Whitelist of valid hosts
//
const { CORS_WHITELIST_LOCAL_REMOTE } = require('../serverConstants')
//
//  Cors options
//
const corsOptions = {
  origin: CORS_WHITELIST_LOCAL_REMOTE,
  optionsSuccessStatus: 200,
  methods: ['POST', 'DELETE', 'OPTIONS']
}
if (debugLog) console.log('corsOptions ', corsOptions)

module.exports = myCorsLocalRemote(corsOptions)
