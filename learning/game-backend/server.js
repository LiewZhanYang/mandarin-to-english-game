const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors

const app = express();
const port = 3000;

app.use(cors());

// Replace with your MongoDB connection string
const dbURI =
  "mongodb+srv://liew:123@cluster01.mmamjtc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a schema and model for questions
const questionSchema = new mongoose.Schema({
  english: String,
  chinese: String,
});

const Question = mongoose.model("Question", questionSchema);

// Seed database with sample data (run this once)
async function seedDatabase() {
  const sampleData = [
    { english: "took the cake", chinese: "最好的惊喜" },
    { english: "obsession", chinese: "痴迷" },
    { english: "overwhelming", chinese: "压倒性的" },
    { english: "outdo", chinese: "超越" },
    { english: "carefree", chinese: "无忧无虑" },
  ];
  //await Question.insertMany(sampleData);
  console.log("Sample data inserted");
}
// Uncomment the next line to seed the database
//seedDatabase();

app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
