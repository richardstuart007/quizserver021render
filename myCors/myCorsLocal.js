const myCorsLocal = require('cors')
const debugLog = false
//
// Whitelist of valid hosts
//
const { CORS_WHITELIST_LOCAL } = require('../quizServerConstants.js')
//
//  Cors options
//
const corsOptions = {
  origin: CORS_WHITELIST_LOCAL,
  optionsSuccessStatus: 200,
  methods: ['POST', 'DELETE', 'OPTIONS']
}
if (debugLog) console.log('corsOptions ', corsOptions)

module.exports = myCorsLocal(corsOptions)
