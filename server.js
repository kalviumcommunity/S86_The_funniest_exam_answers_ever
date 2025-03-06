const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Server is running!!!");
});
app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

// Users route (Fix: Make sure this exists!)
app.get("/users", (req, res) => {
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" }
    ];
    res.json(users);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});