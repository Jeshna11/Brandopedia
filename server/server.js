// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose
  .connect("mongodb+srv://myAtlasDBUser:jeshna%40march11@myatlasclusteredu.fq23m8e.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Schema & Model for Cart Item
const cartItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  quantity: Number,
  photo: String,
  email: String, // to identify user
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

// Save to Cart (POST)
app.post("/cart", async (req, res) => {
  try {
    const newItem = new CartItem(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item added to cart" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// Get Cart by User Email (GET)
app.get("/cart", async (req, res) => {
  try {
    const email = req.query.email;
    const items = await CartItem.find({ email });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Clear Cart (optional)
app.delete("/cart/:email", async (req, res) => {
  try {
    await CartItem.deleteMany({ email: req.params.email });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
