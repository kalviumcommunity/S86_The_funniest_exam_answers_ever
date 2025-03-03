const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Basic server setup
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
