![logo (3)](C:\Users\agraw\Downloads\logo (3).png)



![Screenshot 2025-10-15 112215](C:\Users\agraw\OneDrive\Pictures\Screenshots\Screenshot 2025-10-15 112215.png)

![Screenshot 2025-10-15 112234](C:\Users\agraw\OneDrive\Pictures\Screenshots\Screenshot 2025-10-15 112234.png)

# PrintBazaar- On-Demand Custom Merch Design App

A full-stack **AI-powered merchandise customization and print-on-demand platform** where users can design, personalize, and order custom products like t-shirts, mugs, and hoodies — with social sharing, trend discovery, and admin management.

------

## 📘 Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Environment Configuration](#environment-configuration)
7. [Database Models](#database-models)
8. [Controllers & Routes](#controllers--routes)
9. [JWT Authentication Flow](#jwt-authentication-flow)
10. [AI (Gemini) Integration](#ai-gemini-integration)
11. [Frontend Architecture & Pages](#frontend-architecture--pages)
12. [API Reference](#api-reference)
13. [Admin Panel Features](#admin-panel-features)
14. [Community & Trends](#community--trends)
15. [How to Run the Project](#how-to-run-the-project)

------

## 💡 Overview

**On-Demand Custom Merch Design App** enables users to create, customize, and order personalized merchandise — integrating an AI-based design suggestion engine and community-driven trend discovery.

**Key Features:**

- 🎨 **Multi-layer design editor** with overlays (text, image, sticker, AI element)
- 🤖 **AI-powered design generation** (Gemini integration)
- 🛍️ **Print-on-demand** product ordering with tier-based pricing
- 🌐 **Community sharing & trend exploration**
- 👥 **Followers / Likes / Collaborations**
- 🧠 **Admin analytics & moderation dashboard**

------

## 🧰 Tech Stack

### Frontend

- **Vite + React + React Router DOM**
- **Tailwind CSS**
- **Axios** (for API communication)
- **JWT** for authentication

### Backend

- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **Cloudinary** (for image storage)
- **bcryptjs** (for password hashing)
- **jsonwebtoken** (for secure sessions)
- **dotenv**, **cors**, **nodemailer**

------

## 📂 Folder Structure

```
📦 on-demand-merch-app
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── UserDashboardPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── DesignEditorPage.jsx
│   │   │   ├── CommunityFeedPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   └── AdminDashboardPage.jsx
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── router/
│   │       └── routes.jsx
│   └── package.json
│
└── backend/
    ├── models/
    │   ├── user.js
    │   ├── product.js
    │   ├── design.js
    │   ├── order.js
    │   ├── trend.js
    │   ├── communityPost.js
    │   └── index.js
    ├── config/
    │   ├── db.js
    │   ├── cloudinary.js
    │   └── gemini.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorHandler.js
    ├── controllers/
    │   ├── user/
    │   ├── product/
    │   ├── design/
    │   ├── community/
    │   ├── cart/
    │   ├── ai/
    │   ├── admin/
    │   └── utils/
    ├── routes/
    │   ├── userRoutes.js
    │   ├── productRoutes.js
    │   ├── designRoutes.js
    │   ├── orderRoutes.js
    │   ├── communityRoutes.js
    │   ├── aiRoutes.js
    │   └── adminRoutes.js
    ├── server.js
    ├── .env
    └── package.json
```

------

## ⚙️ Backend Setup

1. Go inside the backend folder:

   ```
   cd backend
   npm init -y
   npm install express mongoose cors dotenv bcryptjs jsonwebtoken cloudinary nodemailer axios
   ```

2. Create **config/db.js**:

   ```
   const mongoose = require("mongoose");
   const connectDB = async () => {
     try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("MongoDB connected successfully");
     } catch (err) {
       console.error("MongoDB connection failed:", err.message);
       process.exit(1);
     }
   };
   module.exports = connectDB;
   ```

3. Create **server.js**:

   ```
   const express = require("express");
   const cors = require("cors");
   const dotenv = require("dotenv");
   const connectDB = require("./config/db");
   dotenv.config();
   
   const app = express();
   app.use(cors());
   app.use(express.json());
   
   connectDB();
   
   app.get("/", (req, res) => res.send("On-Demand Merch App API running"));
   
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

------

## 🎨 Frontend Setup

1. Inside the `frontend` folder:

   ```
   npm create vite@latest . -- --template react
   npm install react-router-dom axios
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Configure **tailwind.config.js**:

   ```
   export default {
     content: ["./index.html", "./src/**/*.{js,jsx}"],
     theme: { extend: {} },
     plugins: [],
   };
   ```

3. Add Tailwind directives in **index.css**:

   ```
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

------

## 🔐 JWT Authentication Flow

- On user login/signup:
  - The backend issues a JWT token (using `jsonwebtoken`).
  - Token is stored in localStorage on the frontend.
- For every protected route request:
  - Token is sent in request headers as `Authorization: Bearer <token>`.
  - Backend middleware `authMiddleware.js` verifies the token.

Example middleware:

```
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ message: "Invalid token" });
  }
};
```

------

## 🧠 AI (Gemini) Integration

**File:** `config/gemini.js`

```
import fetch from "node-fetch";
const API_KEY = process.env.GEMINI_API_KEY;
const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function callGemini(promptText) {
  const body = { contents: [{ parts: [{ text: promptText }] }] };
  const res = await fetch(`${url}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await res.json();
}
```

Use in controllers (e.g., `AIDesignController.js`):

```
import { callGemini } from "../config/gemini.js";
export const generateTextOverlay = async (req, res) => {
  const { prompt } = req.body;
  const response = await callGemini(prompt);
  res.json(response);
};
```

------

## 🗂️ Database Models

Models are defined under `/backend/models/` and include:

- User
- Product
- Design
- CommunityPost
- Trend
- Order

Each schema has timestamps, indexes, and relations (ref: User, Design, Product).

------

## 🚀 Controllers & Routes

Organized by modules:

| Module            | Controllers                                                  | Routes                         |
| ----------------- | ------------------------------------------------------------ | ------------------------------ |
| **User & Auth**   | `AuthController`, `UserController`, `FollowController`       | `/api/user`                    |
| **Products**      | `ProductController`, `TrendController`                       | `/api/products`, `/api/trends` |
| **Design**        | `DesignController`, `OverlayController`, `AIDesignController` | `/api/designs`, `/api/ai`      |
| **Community**     | `CommunityPostController`, `CommentController`               | `/api/community`               |
| **Cart & Orders** | `CartController`, `OrderController`                          | `/api/cart`, `/api/orders`     |
| **Admin**         | `AdminUserController`, `AdminOrderController`                | `/api/admin`                   |
| **Utility**       | `UploadController`, `SearchController`                       | `/api/upload`, `/api/search`   |

------

## 🎨 Frontend Architecture & Pages

Pages are modular and route-managed using **React Router DOM**.

- `/dashboard` → UserDashboardPage.jsx
- `/profile/:userId` → ProfilePage.jsx
- `/design/:designId` → DesignEditorPage.jsx
- `/products` → ProductsPage.jsx
- `/community` → CommunityFeedPage.jsx
- `/cart` → CartPage.jsx
- `/admin` → AdminDashboardPage.jsx

Example Route Setup in `App.jsx`:

```
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/UserDashboardPage";
import Profile from "./pages/ProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

------

## 🧾 API Reference

All API endpoints are listed in `backend/api.txt` after implementation.
 Each module includes CRUD endpoints with JWT authentication.

Example:

```
POST /api/auth/signup
POST /api/auth/login
GET /api/user/dashboard
POST /api/designs
GET /api/products
POST /api/orders/checkout
```

------

## 🧑‍💻 Admin Panel Features

- Manage users, roles, complaints
- Approve/Reject designs
- View orders and batches
- Control trending tags and AI suggestions

------

## 🌐 Community & Trends

- `/api/community/feed` — Fetch public designs
- `/api/community/:postId` — View, like, comment
- `/api/trends` — Fetch trending tags/posts

------

## ⚡ How to Run the Project

```
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

Then open 👉 **http://localhost:5173**

------

## 📎 Environment Configuration

`.env` file example:

```
MONGO_URI=mongodb+srv://yourcluster.mongodb.net/merch
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_key
```