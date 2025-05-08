const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  res.cookie("username", username, {
    httpOnly: true, 
    maxAge: 24 * 60 * 60 * 1000, 
  });

  res.json({ message: `Welcome, ${username}! Cookie set.` });
});

router.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.json({ message: "Logged out and cookie cleared." });
});

module.exports = router;
