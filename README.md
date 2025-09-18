# 🍰 Crumbs&Co. – E-Commerce Website  

**Crumbs&Co.** is a bakery-themed e-commerce website built with **HTML, CSS, JavaScript, and Node.js (Express.js)**.  
It allows users to browse products, view details in a modal, add items to a cart, sign up/login, and place orders.  

---

## 🚀 Features  

### 🛒 Shopping Experience  
- Browse products dynamically loaded from JSON files (`order.json`, etc.)  
- Product detail modal with image, description, price  
- Add to Cart functionality with quantity adjustments (+ / –)  
- Real-time cart total and item count  
- Checkout button with order persistence  

### 👤 User Authentication  
- **Signup** with name, email, and password  
- **Login** for existing users  
- Redirect to homepage after signup/login  
- Orders are linked with the logged-in user  

### 📂 Backend (Express.js)  
- Serves static files (HTML, CSS, JS)  
- REST API endpoints:  
  - `POST /api/orders` → save orders  
  - `POST /api/signup` → register user  
  - `POST /api/login` → authenticate user  
- Data stored in JSON files (`users.json`, `orders.json`)  

---

## 🛠️ Tech Stack  

| Layer          | Technology |
|----------------|------------|
| Frontend       | HTML, CSS, JavaScript (Vanilla JS) |
| Backend        | Node.js, Express.js |
| Database       | JSON files (users.json, orders.json, product JSONs) |
| UI/UX          | Modals, Responsive Layout, Cart Drawer |

---

## ⚡ Installation & Setup  

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/CodeAlpha_Crumbs-Co._E-commerceWebsite.git
   cd CodeAlpha_Crumbs-Co._E-commerceWebsite 

2. Install dependencies:  
   ```bash
   npm install

3. Run the server:  
   ```bash
   node server.js
