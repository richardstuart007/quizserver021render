const myCorsRemote = require('cors')
const debugLog = false
//
// Whitelist of valid hosts
//
const { CORS_WHITELIST_REMOTE } = require('../quizServerConstants.js')
//
//  Cors options
//
const corsOptions = {
  origin: CORS_WHITELIST_REMOTE,
  optionsSuccessStatus: 200,
  methods: ['POST', 'DELETE', 'OPTIONS']
}
if (debugLog) console.log('corsOptions ', corsOptions)

module.exports = myCorsRemote(corsOptions)
