const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config(); // get the "secret" URL

// middleware
app.use(express.json());

// routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); // access the "secret" URL
    app.listen(port, console.log(`Server is listenning on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
