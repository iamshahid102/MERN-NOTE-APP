import express from "express";
import connectToMongo from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";

dotenv.config();

connectToMongo();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
