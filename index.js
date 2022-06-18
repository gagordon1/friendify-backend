const express = require('express')
const app = express();
const dotenv = require("dotenv")
const awsController = require('./aws-controller')
dotenv.config()

const port = process.env.PORT || 3000;
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Friendify Backend Server :)')
})

//
// Request : {
//    userId : String
//}
// 200 : Gets user's refresh token
// Response: refreshToken (String)
// 404 : Unexpected Server Error
// 400 : Request Error (user did not exist)
app.get('/refresh-token/:userId', async (req, res) => {
  try{
    const result = await awsController.getRefreshToken(req.params.userId);
    res.send(result.Item.RefreshToken.S);
  }catch(error){
    console.log(error);
    res.send(error.message)
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
    res.send("Success");
  }
  catch(error){
    console.log(error);
    res.send(error.message)
  }

})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
