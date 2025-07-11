const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const startCardExpirationJob = require("./jobs/CardExpirationJob");

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://easywaygeo.netlify.app",
        "http://localhost:5173",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

const DB_PASS = process.env.DB_USER_PASS;

const uri = `mongodb+srv://giorgigochitidze5555:${DB_PASS}@cluster0.b2xn9kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const MongoLocal = "mongodb://localhost:27017/";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error with connection to MongoDB", err);
  });

const AuthRoute = require("./routes/UserRoutes/UserAuth");
const addCard = require("./routes/Card/CardRoute");
const loadPartners = require("./routes/Partners/PartnersRoute");
const PaymentRouter = require("./routes/Payment/PaymentRouter");

app.use("/", AuthRoute);
app.use("/", addCard);
app.use("/", loadPartners);
app.use("/", PaymentRouter);

startCardExpirationJob();

app.listen(PORT, () => {
  console.log("Server is running on localhost:5000");
});
