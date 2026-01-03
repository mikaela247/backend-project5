import express from "express";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import authRouter from "./routes/auth.js";
import productRouter from "./routes/product.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
