const DEVELOPMENT = false
const DEVELOPMENT_FRONTEND = "http://localhost:3000"
const PRODUCTION_FRONTEND = "https://friendify-frontend.herokuapp.com"

module.exports = {
  getOrigin : () => {return DEVELOPMENT? DEVELOPMENT_FRONTEND : PRODUCTION_FRONTEND}
}
