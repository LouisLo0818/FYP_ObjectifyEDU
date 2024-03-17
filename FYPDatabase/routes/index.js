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

router.post("/api/Student", async function (req, res) {
  // Assuming 'verifyToken' is a middleware that validates the token and attaches the user to 'req'

  const query = { student_id: req.body.student_id }; // Access query parameters with 'req.query'

  try {
    let accountRecords = await client
      .db("eLearning")
      .collection("Student")
      .find(query) // Assuming 'query' is defined and valid for your collection structure
      .toArray();

    if (!accountRecords || accountRecords.length === 0) {
      return res.status(404).send("No account records found.");
    }

    console.log(accountRecords);
    return res.json(accountRecords);
  } catch (error) {
    console.error("Error fetching account records:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/api/Class", async function (req, res) {
  // Assuming 'verifyToken' is a middleware that validates the token and attaches the user to 'req'
  const query = { class_name: req.body.class_name }; // Access query parameters with 'req.query'

  try {
    let classRecords = await client
      .db("eLearning")
      .collection("Account")
      .find(query) // Assuming 'query' is defined and valid for your collection structure
      .toArray();

    if (!classRecords || classRecords.length === 0) {
      return res.status(404).send("No class records found.");
    }

    console.log(classRecords);
    return res.json(classRecords);
  } catch (error) {
    console.error("Error fetching class records:", error);
    return res.status(500).send("Internal Server Error");
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

// //PUT update student question status
router.put("/api/updateQuestion", async function (req, res) {
  const database = client.db("eLearning");

  // Directly use the simplified request body structure
  const { student_id, question_id, is_correct } = req.body;

  // Adjust the query to match the simplified structure
  const query = {
    student_id: student_id,
    "courses.games.questions.question_id": question_id,
  };

  const update = {
    $set: {
      // Adjust your update logic here. Note: This specific update logic might need to be revised
      // because it directly relies on the nested structure which might not directly work with the
      // simplified request structure.
      "courses.$[].games.$[].questions.$[question].is_correct": is_correct,
    },
  };

  const options = {
    arrayFilters: [{ "question.question_id": question_id }],
  };

  try {
    const updateQuestion = await database
      .collection("Student")
      .updateOne(query, update, options);

    if (updateQuestion.matchedCount === 0) {
      return res.status(404).send({ message: "No question found to update." });
    }

    return res.json(updateQuestion);
  } catch (error) {
    console.error("Error updating question:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/api/insertQuestion", async (req, res) => {
  const { student_id, course_id, game_id, question_id, is_correct } = req.body;

  const database = client.db("eLearning");
  const collection = database.collection("Student");

  console.log("Enter insertQuestion");
  console.log(req.body);

  try {
    const result = await collection.updateOne(
      {
        student_id: student_id,
        "courses.course_id": course_id,
        "courses.games.game_id": game_id,
      },
      {
        $push: {
          "courses.$[course].games.$[game].questions": {
            question_id: question_id,
            is_correct: is_correct,
          },
        },
      },
      {
        arrayFilters: [
          { "course.course_id": course_id },
          { "game.game_id": game_id },
        ],
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

    res
      .status(200)
      .json({ message: "Question added successfully", result: result });
  } catch (error) {
    console.error("Error updating game questions:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
});

// //post health data: Add health data
// router.post('/addHealthDataRecord', verifyToken, async function (req, res) {
//   const database = client.db('FYP_medApp');

//   console.log(req.body);

//   let addhealthDataRecordResult = await database.collection('medApp_healthDataRecord').insertOne(req.body);

//   console.log("addhealthDataRecordResult");
//   console.log(addhealthDataRecordResult); //medicalRecord, object

//   if (addhealthDataRecordResult == null) {
//     let addhealthDataRecordResult = {};
//     addhealthDataRecordResult.resultCode = 404; //not found
//   }

//   return res.json(addhealthDataRecordResult); //return the inserted data?

// });

module.exports = router;
