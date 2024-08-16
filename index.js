const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://ecom-edeb3.web.app",
    "https://ecom-edeb3.firebaseapp.com",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

const CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wpwwlgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const products = client.db("ecomDB").collection("products");
    
    // Get all products
    app.get("/products", async (req, res) => {
      try {
        const allProducts = await products.find().toArray();
        res.status(200).json(allProducts);
      } catch (error) {
        res.status(500).send({ message: "Error fetching products", error });
      }
    });
    
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server....");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
