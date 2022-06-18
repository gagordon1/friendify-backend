var AWS = require('aws-sdk');

module.exports = {

    uploadRefreshToken : function (userId, refreshToken){

      AWS.config.update({region: process.env.REGION});

      // Create the DynamoDB service object
      var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

      var params = {
      TableName: 'friendify-database',
      Item: {
        'SpotifyUserId' : {S : userId},
        'RefreshToken' : {S : refreshToken}
      }
      };

      // Call DynamoDB to add the item to the table
      ddb.putItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        return err.message;
      } else {
        console.log("Success", data);
        return data;
      }
      });
    },

    getRefreshToken : async function (userId){

      AWS.config.update({region: process.env.REGION});

      // Create the DynamoDB service object
      var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

      var params = {
      TableName: 'friendify-database',
      Key: {
        'SpotifyUserId' : {S : userId}
      }
      };
      return await ddb.getItem(params).promise();
    },






}
