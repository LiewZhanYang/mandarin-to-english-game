const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Path to the JSON file
const jsonFilePath = path.join(__dirname, "questions.json");

// API endpoint to get questions
app.get("/questions", (req, res) => {
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const questions = JSON.parse(data);
    res.json(questions);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
