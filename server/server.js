import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import todoRoute from "./routes/todoRoute.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Api routes
app.use("/api/todos", todoRoute);

// Start the server
app.listen(port, async () => {
  try {
    await connectDb();
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.log(`Error while connecting server ${err.message}`);
  }
});
