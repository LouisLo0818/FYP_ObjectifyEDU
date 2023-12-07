//setting up the server
var express = require("express");
var router = express.Router();

//setting up the database
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://louis:Hellomashi1!@cluster0.rpobuov.mongodb.net/";
const client = new MongoClient(uri);

//setting up the api

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const jwt = require("jsonwebtoken");

// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers["authorization"];
//   // Check if bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//     // Split at the space
//     const bearer = bearerHeader.split(" ");
//     // Get token from array
//     const bearerToken = bearer[1];

//     // Set the token
//     req.token = bearerToken;

//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }
// }

router.post("/api/login", async function (req, res) {
  let account = req.body.account;
  let password = req.body.password;

  const query = { $or: [{ account: account }, { student_id: account }] }; //object query

  let result = await client
    .db("eLearning")
    .collection("Account")
    .findOne(query);
  console.log("post login result:");
  console.log(result); //userProfile

  if (result && result.password === password) {
    result.resultCode = 200; //success

    // Generate JWT token
    const token = jwt.sign({ result }, "e8f9^&F$4d2v!73G", { expiresIn: "1h" });
    // Attach token to the response
    result.token = token;

    console.log("login success");

    return res.json(result);
  } else {
    console.log("login fail");
    let result = {};
    result.resultCode = 400; //fail //TODO: res.status(404).send('Not found');
    // return res.json(result)
    return res.status(404).send("Not found");
  }
});

router.post("/api/Process", async function (req, res) {
  //verifyToken is a middleware function
  // const database = client.db('eLearning');
  const query = { student_id: req.body.stuid }; //object query

  console.log(query);
  let stuRecord = await client
    .db("eLearning")
    .collection("Process")
    .findOne(query);

  // let medinceRecord = await database.collection('medApp_medicineRecord').find(query).toArray();
  if (!stuRecord) {
    return res.status(404).send("No student record found."); //no need resultCode, just send error message
  }
  console.log(stuRecord);

  return res.json(stuRecord);
});

router.get("/api/Courses", async function (req, res) {
  //verifyToken is a middleware function
  // const database = client.db('eLearning');

  let courseRecords = await client
    .db("eLearning")
    .collection("Course")
    .find({})
    .toArray();

  if (!courseRecords || courseRecords.length === 0) {
    return res.status(404).send("No course records found.");
  }

  console.log(courseRecords);

  return res.json(courseRecords);
});

module.exports = router;
