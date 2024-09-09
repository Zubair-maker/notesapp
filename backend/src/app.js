import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
import authRouter from "./routes/authRoute.js";
import noteRouter from "./routes/noteRoute.js";

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

//error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
export { app };
