const express = require("express");
const router = express.Router();
const FunnyAnswer = require("./models/FunnyAnswer");

function validateAnswerInput(req, res, next) {
  const { student_name, subject, question, funny_answer, created_by } = req.body;
  
  if (!student_name || !subject || !question || !funny_answer || !created_by) {
    return res.status(400).json({ error: "Name, Subject, Question, Answer and created_by are required!" });
  }
  
  next(); 
}

router.post("/", validateAnswerInput, async (req, res) => {
  try {
    const answer = new FunnyAnswer(req.body);
    await answer.save();
    res.status(201).json(answer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const answers = await FunnyAnswer.find();
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const answer = await FunnyAnswer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found" });
    res.json(answer);
  } catch (err) {
    res.status(404).json({ error: "Answer not found" });
  }
});

router.put("/:id", validateAnswerInput, async (req, res) => {
  try {
    const updated = await FunnyAnswer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Answer not found for update" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await FunnyAnswer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Answer not found for deletion" });
    res.json({ message: "Answer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
