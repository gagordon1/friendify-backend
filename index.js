const express = require('express')
const app = express();
const dotenv = require("dotenv")
const awsController = require('./aws-controller')
const config = require('./config')
dotenv.config()

const port = process.env.PORT || 3000;
const origin = config.getOrigin()
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.get('/', (req, res) => {
  res.send('Friendify Backend Server :)')
})

//
// Request : {
//    userId : String
//}
// 200 : Gets user's refresh token
// Response: {refreshToken : String}
// 404 : Unexpected Server Error
// 400 : Request Error (user did not exist)
app.get('/refresh-token/:userId', async (req, res) => {
  try{
    const result = await awsController.getRefreshToken(req.params.userId);
    res.send({refreshToken : result.Item.RefreshToken.S});
  }catch(error){
    console.log(error);
    res.send({message : error.message})
  }
})

//
// Request : {
//    userId : String
//    refreshToken : String
//}
// 200 : Updates database of refresh tokens if user exists
//       If user does not exist, create a new database entry with user and refresh token
// Response: {
//    refreshToken : String
//    existed : boolean
//}
//
// 400 : Server Error
app.post('/refresh-token', async (req, res) => {
  try{
    const result = await awsController.uploadRefreshToken(req.body.userId, req.body.refreshToken)
    res.send({message : "Success"});
  }
  catch(error){
    console.log(error);
    res.send({message: error.message})
  }

})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
