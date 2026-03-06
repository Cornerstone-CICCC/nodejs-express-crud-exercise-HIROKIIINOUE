import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product.routes";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
