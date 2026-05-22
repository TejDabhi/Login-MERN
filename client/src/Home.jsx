import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

  const navigate = useNavigate()

  const handleLogout = () => {

    axios.get('http://localhost:3001/logout', {

      withCredentials: true

    })

    .then((res) => {

      alert(res.data.message)

      navigate('/login')

    })

    .catch((err) => {

      console.log(err)

    })

  }

  return (

    <div className="flex flex-col items-center justify-center min-h-screen gap-5">

      <h1 className="text-3xl font-bold">
        Home Page
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-5 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>

  )

}

export default Home