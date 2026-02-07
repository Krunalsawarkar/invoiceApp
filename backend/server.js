require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDb = require("./config/db");

const authRoute = require("./routes/authRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Database Connection
connectDb();

//CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
  }),
);

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoute);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/ai", aiRoutes);

//Server Start
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
