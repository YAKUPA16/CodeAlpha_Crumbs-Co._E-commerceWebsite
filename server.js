const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// serve static files
app.use(express.static("public"));

// path to order.json in your project folder
const ordersFile = path.join(__dirname, "order.json");

// helper: load orders
function loadOrders() {
  try {
    return JSON.parse(fs.readFileSync(ordersFile, "utf8"));
  } catch (err) {
    return []; // empty if file doesn't exist or broken
  }
}

// GET all orders
app.get("/api/orders", (req, res) => {
  res.json(loadOrders());
});

// POST new order
app.post("/api/orders", (req, res) => {
  if (!req.body.userId) {
    return res.status(401).json({ error: "Login required" });
  }

  const orders = loadOrders(); // use helper instead of raw fs.readFileSync
  const newOrder = {
    id: Date.now(),
    userId: req.body.userId,
    items: req.body.items,
    createdAt: new Date(),
  };

  orders.push(newOrder);

  try {
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
    console.log("✅ Order saved:", newOrder);
    res.json(newOrder);
  } catch (err) {
    console.error("❌ Failed to save order:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


//sign in section
const usersFile = path.join(__dirname, "users.json");

// helper: load users
function loadUsers() {
  try {
    return JSON.parse(fs.readFileSync(usersFile, "utf8"));
  } catch (err) {
    return [];
  }
}

// helper: save users
function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// SIGN UP (register new user)
app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  let users = loadUsers();

  // check if email already exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password
  };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: "User registered successfully" });
});

// SIGN IN (login)
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const users = loadUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // for simplicity, just return user info (no sessions yet)
  res.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
});
