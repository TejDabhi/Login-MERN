const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const nodemailer = require('nodemailer');

const app = express()



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
app.use(express.json())
app.use(cookieParser())


// MongoDB Connection
const PORT = process.env.PORT || 3001

const mongoURI = "mongodb+srv://tej:tej123@cluster0.2lbv03r.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000,
    family: 4
})
.then(() => {
    console.log("MongoDB Connected")
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err)
})

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB")
})

mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error:", err)
})

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected")
})
// Model
const EmployeeModel = require('./models/Employee.js')




app.get("/", (req, res) => {
    res.json({
        message: "Backend is running"
    })
})
app.get('/test-db', async (req, res) => {
    try {
        const users = await EmployeeModel.find()

        res.json({
            message: "DB working",
            count: users.length
        })
    } catch (error) {
        res.status(500).json({
            message: "DB not working",
            error: error.message
        })
    }
})
// ================= REGISTER =================

app.post('/register', async (req, res) => {

    const { email, password } = req.body

    try {

        // Check User
        const UserExist = await EmployeeModel.findOne({ email })

        if (UserExist) {

            return res.status(400).json({
                message: "Email Already Exist"
            })

        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create User
        const newUser = await EmployeeModel.create({
            email,
            password: hashedPassword
        })

        res.status(200).json({
            message: "User Registered Successfully",
            user: newUser
        })
    } catch (error) {
        console.log("REGISTER ERROR:", error)
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })

    }

})


// ================= LOGIN =================

app.post('/login', async (req, res) => {

    const { email, password } = req.body


    

    try {

        // Find User
        const User = await EmployeeModel.findOne({ email })
        // User Not Found
        if (!User) {
            return res.status(400).json({
                message: "User Not Found"
            })
        }
        // Compare Password
        const isMatch = await bcrypt.compare(password, User.password)
        // Wrong Password
        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            })

        }

        // Generate JWT Token
        const token = jwt.sign(
            {id: User._id,email: User.email},
            "mysecretkey",
            { expiresIn: "1d"}
        )
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        })
        // Success Response
        res.status(200).json({
            message: "Login Successful",
            user: User
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
})

// Forgot Password Route
// ================= FORGOT PASSWORD =================

// ================= FORGOT PASSWORD =================

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

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "tejdabhi84@gmail.com",
                pass: "rfhzlioubgideruv"
            }
        })

        const resetLink = `https://login-mern-gray.vercel.app/resetPassword/${user._id}/${token}`

        const mailOptions = {
            from: "tejdabhi84@gmail.com",
            to: email,
            subject: "Reset Password",
            text: `Click this link to reset your password: ${resetLink}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("EMAIL SEND ERROR:", error)

                return res.status(500).json({
                    message: "Error Sending Email",
                    error: error.message
                })
            }

            console.log("Email sent:", info.response)

            return res.status(200).json({
                message: "Reset Link Sent Successfully"
            })
        })

    } catch (error) {
        console.log("FORGOT PASSWORD ERROR:", error)

        return res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
})
// Reset Password Route
app.post('/reset-password/:id/:token', async (req, res) => {

    const { id, token } = req.params

    const { password } = req.body

    try {

        jwt.verify(token, "mysecretkey", async (err, decoded) => {

            if (err) {

                return res.json({
                    status: "Error With Token"
                })

            } else {

                // Hash Password
                const hashedPassword = await bcrypt.hash(password, 10)

                // Update Password
                await EmployeeModel.findByIdAndUpdate(id, {
                    password: hashedPassword
                })

                return res.json({
                    status: "Password Updated Successfully"
                })

            }

        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Server Error"
        })

    }

})
// ================= AUTH MIDDLEWARE =================

const verifyUser = (req, res, next) => {

    const token = req.cookies.token

    // Token Missing
    if (!token) {

        return res.status(401).json({
            message: "Token Missing"
        })

    }

    // Verify Token
    jwt.verify(token, "mysecretkey", (err, decoded) => {

        if (err) {

            return res.status(401).json({
                message: "Invalid Token"
            })

        }

        req.user = decoded

        next()

    })

}
// ================= PROTECTED ROUTE =================

app.get('/home', verifyUser, (req, res) => {

    return res.json({

        message: "Protected Route Accessed",

        user: req.user

    })

})



// ================= LOGOUT =================

app.get('/logout', (req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })

    return res.json({

        message: "Logout Successful"

    })

})

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})

