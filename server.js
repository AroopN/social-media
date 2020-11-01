const express = require("express");
const app = express();
const connectToDatabase = require("./config/connectToDatabase")
const cors = require("cors")

// Connect express app to database
connectToDatabase();
app.use(cors()) // prevents CORS errors
app.use(express.json({extended: false}))


// app.use("/api/posts", require("./routes/posts.js"));
app.use("/api/users", require("./routes/users.js"))

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is on port ${PORT}`);
});
