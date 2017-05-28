/**
 * Created by Nikhil on 23/05/17.
 */
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: "myKeyId",
  secretAccessKey: "secretKey",
  region: "us-east-1",
  endpoint: new AWS.Endpoint('http://localhost:8000')
});

if (process.env.NODE_ENV === 'production') {
  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: "us-west-2",
    endpoint: new AWS.Endpoint('http://elasticbeanstalk.us-west-2.amazonaws.com')
  });
} else {
  AWS.config.update({
    accessKeyId: "myKeyId",
    secretAccessKey: "secretKey",
    region: "us-east-1",
    endpoint: new AWS.Endpoint('http://localhost:8000')
  });
}

function connectToDB() {
  return new AWS.DynamoDB.DocumentClient();
}

function generateToken(user) {
  //1. Dont use password and other sensitive fields
  //2. Use fields that are useful in other parts of the
  //app/collections/models
  var u = {
    email: user.email,
  };
  return token = jwt.sign(u, '##Nikhil%Was%Here##', {
    expiresIn: 60 * 60 * 24 * 30 // expires in 30 days
  });
}

function error(res, statusCode, msg) {
  res.status(statusCode).json({
    error: true,
    message: msg,
  })
}

module.exports = {
  connectToDB: connectToDB,
  generateToken: generateToken,
  error: error,
};