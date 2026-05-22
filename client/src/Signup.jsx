import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  // Check User Already Logged In
  useEffect(() => {

    axios.get('http://localhost:3001/home')

      .then(() => {

        navigate('/home')

      })

      .catch(() => {

        console.log("Signup Allowed")

      })

  }, [])

  const handleSubmit = (e) => {

    e.preventDefault()

    axios.post('http://localhost:3001/register', {
      email,
      password
    })

      .then((res) => {

        alert(res.data.message)

        if (res.data.user) {

          navigate('/login')

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

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Signup
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

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
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
            Signup
          </button>
            <p className="text-center text-sm text-gray-600 mt-6">

            Already have an account?{" "}

            <span
                onClick={() => navigate('/login')}
                className="text-blue-500 cursor-pointer hover:underline"
            >
                Login
            </span>

            </p> 
        </form>

      </div>

    </div>

  )

}

export default Signup