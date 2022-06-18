const DEVELOPMENT = true
const DEVELOPMENT_FRONTEND = "http://localhost:3000"
const PRODUCTION_FRONTEND = null

module.exports = {
  getOrigin : () => {return DEVELOPMENT? DEVELOPMENT_FRONTEND : PRODUCTION_FRONTEND}
}
