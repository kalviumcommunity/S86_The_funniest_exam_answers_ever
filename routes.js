const express = require("express");
const router = express.Router();
const FunnyAnswer = require("./models/FunnyAnswer");


router.post("/answers", async (req, res) => {
  try {
    const answer = new FunnyAnswer(req.body);
    await answer.save();
    res.status(201).json(answer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/answers", async (req, res) => {
  try {
    const answers = await FunnyAnswer.find();
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/answers/:id", async (req, res) => {
  try {
    const answer = await FunnyAnswer.findById(req.params.id);
    res.json(answer);
  } catch (err) {
    res.status(404).json({ error: "Answer not found" });
  }
});

router.put("/answers/:id", async (req, res) => {
  try {
    const updated = await FunnyAnswer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/answers/:id", async (req, res) => {
  try {
    await FunnyAnswer.findByIdAndDelete(req.params.id);
    res.json({ message: "Answer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
