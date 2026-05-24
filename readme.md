# MERN Authentication System

A full-stack MERN authentication project with user registration, login, protected routes, logout, forgot password, reset password, JWT authentication, HTTP-only cookies, MongoDB Atlas database, and deployment support for Vercel and Render.

---

## Live Project Links

### Frontend

```txt
https://login-mern-gray.vercel.app
```

### Backend

```txt
https://login-mern-nuwl.onrender.com
```

---

## Project Overview

This project is a complete authentication system built using the MERN stack.

The frontend is built with React and deployed on Vercel.  
The backend is built with Node.js, Express.js, MongoDB, and deployed on Render.

Authentication is handled using JWT tokens stored in HTTP-only cookies.

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite
- Vercel

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcrypt
- jsonwebtoken
- cookie-parser
- cors
- Nodemailer optional for email reset link
- Render

---

## Features

- User Signup
- User Login
- Password Hashing using bcrypt
- JWT Token Generation
- HTTP-only Cookie Authentication
- Protected Route Access
- Logout Functionality
- Forgot Password
- Reset Password
- MongoDB Atlas Integration
- Cross-domain Cookie Handling
- CORS Setup for Vercel and Render
- React Router Protected Routes
- Deployment-ready Configuration
- Vercel Rewrite Setup for Dynamic Routes

---

## Folder Structure

```bash
Login-MERN-main/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
├── server/
│   ├── models/
│   │   └── Employee.js
│   │
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## Installation Guide

Clone the repository:

```bash
git clone https://github.com/your-username/your-repository-name.git
```

Go inside the project folder:

```bash
cd Login-MERN-main
```

---

## Backend Setup

Go to the backend folder:

```bash
cd server
```

Install backend dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

Backend will run locally on:

```txt
http://localhost:3001
```

---

## Frontend Setup

Go to the frontend folder:

```bash
cd client
```

Install frontend dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Frontend will run locally on:

```txt
http://localhost:5173
```

---

## Backend Dependencies

```bash
npm install express mongoose bcrypt jsonwebtoken cookie-parser cors nodemailer
```

---

## Frontend Dependencies

```bash
npm install axios react-router-dom
```

Tailwind CSS should also be configured if not already installed.

---

## Backend API Endpoints

### 1. Test Backend

```http
GET /
```

Response:

```json
{
  "message": "Backend is running"
}
```

---

### 2. Test Database

```http
GET /test-db
```

Response:

```json
{
  "message": "DB working",
  "count": 1
}
```

---

### 3. Register User

```http
POST /register
```

Request Body:

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

Success Response:

```json
{
  "message": "User Registered Successfully",
  "user": {
    "_id": "user_id",
    "email": "user@gmail.com"
  }
}
```

Error Response:

```json
{
  "message": "Email Already Exist"
}
```

---

### 4. Login User

```http
POST /login
```

Request Body:

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

Success Response:

```json
{
  "message": "Login Successful",
  "user": {
    "_id": "user_id",
    "email": "user@gmail.com"
  }
}
```

The backend also sets a JWT token in an HTTP-only cookie.

---

### 5. Protected Home Route

```http
GET /home
```

This route is protected and requires a valid token cookie.

Success Response:

```json
{
  "message": "Protected Route Accessed",
  "user": {
    "id": "user_id",
    "email": "user@gmail.com",
    "iat": 1234567890,
    "exp": 1234567890
  }
}
```

Error Response:

```json
{
  "message": "Token Missing"
}
```

---

### 6. Logout User

```http
GET /logout
```

Success Response:

```json
{
  "message": "Logout Successful"
}
```

This clears the token cookie.

---

### 7. Forgot Password

```http
POST /forgot-password
```

Request Body:

```json
{
  "email": "user@gmail.com"
}
```

Success Response:

```json
{
  "message": "Reset link generated successfully",
  "resetLink": "https://login-mern-gray.vercel.app/resetPassword/user_id/token"
}
```

---

### 8. Reset Password

```http
POST /reset-password/:id/:token
```

Request Body:

```json
{
  "password": "newpassword"
}
```

Success Response:

```json
{
  "status": "Password Updated Successfully"
}
```

---

## MongoDB Model

### `models/Employee.js`

```js
const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const EmployeeModel = mongoose.model("employees", EmployeeSchema)

module.exports = EmployeeModel
```

---

## Important Backend Configuration

### CORS Setup

Since the frontend is deployed on Vercel and backend is deployed on Render, CORS must allow the frontend domain.

```js
const allowedOrigins = [
    "https://login-mern-gray.vercel.app"
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

app.options(/.*/, cors({
    origin: "https://login-mern-gray.vercel.app",
    credentials: true
}))
```

---

## Cookie Setup

For deployed frontend and backend on different domains, cookie settings must be:

```js
res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
})
```

### Why these options are needed

| Option | Purpose |
|---|---|
| `httpOnly: true` | Prevents JavaScript from reading the cookie |
| `secure: true` | Required for HTTPS deployment |
| `sameSite: "none"` | Allows cookie sharing across Vercel and Render |
| `maxAge` | Sets cookie expiry time |

---

## Frontend Axios Setup

Every request that uses cookies must include:

```js
{
  withCredentials: true
}
```

Example login request:

```js
axios.post('https://login-mern-nuwl.onrender.com/login', {
    email,
    password
}, {
    withCredentials: true
})
```

Example protected route request:

```js
axios.get('https://login-mern-nuwl.onrender.com/home', {
    withCredentials: true
})
```

---

## Login Handler Example

```js
const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('https://login-mern-nuwl.onrender.com/login', {
        email,
        password
    }, {
        withCredentials: true
    })
    .then((res) => {
        alert(res.data.message)

        if (res.data.user) {
            navigate('/home')
        }
    })
    .catch((err) => {
        if (err.response) {
            alert(err.response.data.message)
        } else {
            alert("Server Error")
        }
    })
}
```

---

## Protected Route Example

### `ProtectedRoute.jsx`

```jsx
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const [auth, setAuth] = useState(null)

    useEffect(() => {
        axios.get('https://login-mern-nuwl.onrender.com/home', {
            withCredentials: true
        })
        .then(() => setAuth(true))
        .catch(() => setAuth(false))
    }, [])

    if (auth === null) return null

    return auth ? children : <Navigate to="/login" />
}

export default ProtectedRoute
```

---

## React Routes

### `App.jsx`

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
```

---

## Vercel Configuration

React Router dynamic routes like:

```txt
/resetPassword/:id/:token
```

can show a Vercel 404 after deployment.

To fix this, add `vercel.json` in the frontend root folder.

### `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

This tells Vercel to serve the React app for all frontend routes.

---

## Forgot Password Without Nodemailer

This version generates the reset link and returns it directly in API response.

This is useful for testing.

```js
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body

    try {
        const user = await EmployeeModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User Not Registered"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            "mysecretkey",
            { expiresIn: "1h" }
        )

        const resetLink = `https://login-mern-gray.vercel.app/resetPassword/${user._id}/${token}`

        return res.status(200).json({
            message: "Reset link generated successfully",
            resetLink: resetLink
        })

    } catch (error) {
        console.log("FORGOT PASSWORD ERROR:", error)

        return res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
})
```

---

## Forgot Password Frontend

### `ForgotPassword.jsx`

```jsx
import axios from 'axios'
import React, { useState } from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('https://login-mern-nuwl.onrender.com/forgot-password', {
            email
        })
        .then((res) => {
            alert(res.data.message)

            if (res.data.resetLink) {
                window.location.href = res.data.resetLink
            }
        })
        .catch((err) => {
            console.log(err)

            if (err.response) {
                alert(err.response.data.error || err.response.data.message)
            } else {
                alert("Server Error")
            }
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Forgot Password
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                    >
                        Generate Reset Link
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
```

---

## Reset Password Backend

```js
app.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params
    const { password } = req.body

    try {
        jwt.verify(token, "mysecretkey", async (err, decoded) => {
            if (err) {
                return res.json({
                    status: "Error With Token"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            await EmployeeModel.findByIdAndUpdate(id, {
                password: hashedPassword
            })

            return res.json({
                status: "Password Updated Successfully"
            })
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })
    }
})
```

---

## Reset Password Frontend

### `ResetPassword.jsx`

```jsx
import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const { id, token } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`https://login-mern-nuwl.onrender.com/reset-password/${id}/${token}`, {
            password
        })
        .then((res) => {
            alert(res.data.status)
        })
        .catch((err) => {
            console.log(err)

            if (err.response) {
                alert(err.response.data.message)
            } else {
                alert("Server Error")
            }
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Reset Password
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
```

---

## MongoDB Atlas Setup

To connect MongoDB Atlas with Render:

1. Go to MongoDB Atlas
2. Open Network Access
3. Click Add IP Address
4. Add:

```txt
0.0.0.0/0
```

5. Save and wait until it becomes active

This allows Render to connect to MongoDB Atlas.

---

## Common Errors and Fixes

### 1. CORS Error

Error:

```txt
Access to XMLHttpRequest has been blocked by CORS policy
```

Fix:

- Make sure backend CORS origin is your Vercel URL
- Make sure `credentials: true` is enabled
- Make sure frontend Axios uses `withCredentials: true`

---

### 2. Token Missing

Error:

```json
{
  "message": "Token Missing"
}
```

Fix:

- Login request must use `withCredentials: true`
- Protected route request must use `withCredentials: true`
- Cookie must use `sameSite: "none"` and `secure: true`
- Check cookies under backend Render domain, not frontend Vercel domain

---

### 3. MongoDB Buffering Timeout

Error:

```txt
Operation `employees.find()` buffering timed out after 10000ms
```

Fix:

- Allow `0.0.0.0/0` in MongoDB Atlas Network Access
- Check MongoDB username and password
- Check connection string
- Make sure cluster is not paused

---

### 4. Vercel 404 on Reset Password Link

Error:

```txt
404 NOT_FOUND
```

Fix:

Add `vercel.json` in frontend root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

---

### 5. Cookie Not Visible in Browser

Reason:

- Cookie is stored under backend domain
- Cookie is HTTP-only
- Cookie cannot be seen using `document.cookie`

Check cookie here:

```txt
DevTools → Application → Cookies → https://login-mern-nuwl.onrender.com
```

---

## Deployment Notes

### Frontend Deployment on Vercel

Important points:

- Add `vercel.json`
- Make sure API URLs point to Render backend
- Redeploy after every GitHub push

---

### Backend Deployment on Render

Important points:

- Add MongoDB Atlas access
- Use correct CORS origin
- Use HTTPS cookie settings
- Start command:

```bash
npm start
```

---

## Security Notes

For production, do not hardcode sensitive values like:

```js
"mysecretkey"
```

or MongoDB connection strings.

Use environment variables instead:

```js
process.env.JWT_SECRET
process.env.MONGO_URI
process.env.FRONTEND_URL
```

Also do not expose Gmail app passwords or MongoDB credentials in public repositories.

---

## Final Authentication Flow

```txt
User logs in
↓
Backend verifies email and password
↓
Backend creates JWT token
↓
Backend stores token in HTTP-only cookie
↓
Frontend redirects user to /home
↓
ProtectedRoute calls /home with credentials
↓
Backend reads token from cookie
↓
Backend verifies JWT
↓
User gets access to protected page
```

---

## Author

Created by Tej Dabhi

---

## License

This project is for learning and educational purposes.
