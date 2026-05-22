import axios from 'axios'
import React, { useState } from 'react'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {

        e.preventDefault()

        axios.post('http://localhost:3001/forgot-password', {
            email
        })

        .then((res) => {

            alert(res.data.message)

        })

        .catch((err) => {

            console.log(err)

            // Backend Error
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
                    Forgot Password
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Email */}
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

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                    >
                        Send Reset Link
                    </button>

                </form>

            </div>

        </div>

    )
}

export default ForgotPassword