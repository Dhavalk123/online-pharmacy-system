# 💊 Online Pharmacy Backend System

A RESTful backend API for an **Online Pharmacy System** built using **Node.js, Express.js, and PostgreSQL**.  
This project implements authentication, product management, cart functionality, and order processing.

---

# 🚀 Features

- User Registration & Login (JWT Authentication)
- Product Management
- Add products to cart
- Update cart quantity
- Remove products from cart
- Place orders from cart
- Secure APIs with middleware
- PostgreSQL database integration

---

# 🛠 Tech Stack

Backend:
- Node.js
- Express.js

Database:
- PostgreSQL

Authentication:
- JSON Web Token (JWT)

Tools:
- Thunder Client / Postman
- pgAdmin
- Git & GitHub

---

# 📂 Project Structure
# 💊 Online Pharmacy Backend System

A RESTful backend API for an **Online Pharmacy System** built using **Node.js, Express.js, and PostgreSQL**.  
This project implements authentication, product management, cart functionality, and order processing.

---

# 🚀 Features

- User Registration & Login (JWT Authentication)
- Product Management
- Add products to cart
- Update cart quantity
- Remove products from cart
- Place orders from cart
- Secure APIs with middleware
- PostgreSQL database integration

---

# 🛠 Tech Stack

Backend:
- Node.js
- Express.js

Database:
- PostgreSQL

Authentication:
- JSON Web Token (JWT)

Tools:
- Thunder Client / Postman
- pgAdmin
- Git & GitHub

---

# 📂 Project Structure
online-pharmacy-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md

---

# 🔑 API Endpoints

Below are the main APIs available in the system.

---

## 1️⃣ Authentication APIs

### Register User

POST /api/auth/register

Example Body

{
  "name": "Dhaval",
  "email": "dhaval@test.com",
  "password": "123456"
}

---

### Login User

POST /api/auth/login

Example Body

{
  "email": "dhaval@test.com",
  "password": "123456"
}

Response

{
  "token": "JWT_TOKEN"
}

---

## 2️⃣ Product APIs

### Get All Products

GET /api/products

---

### Add Product

POST /api/products/add

Example Body

{
  "product_name": "Paracetamol",
  "price": 20,
  "stock": 100
}

---

## 3️⃣ Cart APIs

### Add Product to Cart

POST /api/cart/add

Example Body

{
  "user_id": 3,
  "product_id": 4,
  "quantity": 2
}

---

### Get Cart

GET /api/cart

Authorization Required

Header

Authorization: Bearer TOKEN

---

### Update Cart Quantity

PUT /api/cart/update/:cart_id

Example

PUT /api/cart/update/10

Body

{
  "quantity": 3
}

---

### Remove Item From Cart

DELETE /api/cart/remove/:cart_id

Example

DELETE /api/cart/remove/10

---

## 4️⃣ Order APIs

### Place Order

POST /api/orders/create

Authorization Required

This API will:

1. Read items from cart
2. Calculate total price
3. Create order
4. Insert order items
5. Clear cart

---

### Get Orders

GET /api/orders

Authorization Required

---

# 🗄 Database Tables

The system uses the following tables:

• users  
• products  
• cart  
• orders  
• order_items  

Relationships:

Users → Cart → Orders  
Orders → Order Items → Products

---

# ⚙️ Installation & Setup

Clone the repository

git clone https://github.com/Dhavalk123/online-pharmacy-system.git

Go to backend folder

cd online-pharmacy-system/backend

Install dependencies

npm install

Create .env file

PORT=5000
DATABASE_URL=your_postgres_connection
JWT_SECRET=your_secret_key

Start the server

node server.js

Server runs at

http://localhost:5000

---

# 🧪 Testing APIs

You can test APIs using:

• Thunder Client (VS Code)  
• Postman  

