import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRouter.js";


dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({extented: true}));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/e-commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});




app.use("/api/users", userRouter);
app.use('/api/products', productRouter);
app.get("/", (req, res) => {
  res.send("server is ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`server is runnig on PORT ${PORT}`)
);
