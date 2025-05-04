const express = require("express");
const router = express.Router();
const FunnyAnswer = require("./models/FunnyAnswer");

// Validation middleware
function validateAnswerInput(req, res, next) {
  const { student_name, subject, question, funny_answer } = req.body;
  
  if (!student_name || !subject || !question || !funny_answer) {
    return res.status(400).json({ error: "Name, Subject, Question, and Answer are required!" });
  }
  
  next(); // Proceed to next middleware/handler
}

// Create a new funny answer
router.post("/", validateAnswerInput, async (req, res) => {
  try {
    const answer = new FunnyAnswer(req.body);
    await answer.save();
    res.status(201).json(answer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all funny answers
router.get("/", async (req, res) => {
  try {
    const answers = await FunnyAnswer.find();
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single funny answer by ID
router.get("/:id", async (req, res) => {
  try {
    const answer = await FunnyAnswer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found" });
    res.json(answer);
  } catch (err) {
    res.status(404).json({ error: "Answer not found" });
  }
});

// Update a funny answer by ID
router.put("/:id", validateAnswerInput, async (req, res) => {
  try {
    const updated = await FunnyAnswer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Answer not found for update" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a funny answer by ID
router.delete("/:id", async (req, res) => {
  try {
    await FunnyAnswer.findByIdAndDelete(req.params.id);
    res.json({ message: "Answer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
