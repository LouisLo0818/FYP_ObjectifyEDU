// //setting up the server
// var express = require('express');
// var router = express.Router();

// //setting up the database
// const { MongoClient } = require("mongodb");

// const uri = "mongodb+srv://louis:Hellomashi1!@cluster0.rpobuov.mongodb.net/";
// const client = new MongoClient(uri);

// //setting up the api

// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// // //GET user profile
// // router.get('/user', async function (req, res) {
// //   const database = client.db('FYP_medApp');

// //   //query to find a username with the name "jambro0"
// //   const query = { username: 'jambro0' };

// //   let result = await database.collection('medApp_userProfile').findOne(query);
// //   console.log(result); //userProfile

// //   return res.json(result); //not res.render -- that's to render ejs file only.

// // });

// //POST Login function
// router.post('/login', async function (req, res) {

//   let username = req.body.username;
//   let password = req.body.password;

//   const query = { $or: [{username: username }, {userID: username}] } //object query

//   const database = client.db('FYP_medApp');
//   let result = await database.collection('medApp_userProfile').findOne(query);
//   console.log("post login result:");
//   console.log(result); //userProfile

//   if (result != null && result?.password == password) {
//     result.resultCode = 200; //success
//     console.log("login success");
//     return res.json(result);
 
//   } else {
//     console.log("login fail");
//     let result = {};
//     result.resultCode = 400; //fail
//     return res.json(result)
//   }

// });

