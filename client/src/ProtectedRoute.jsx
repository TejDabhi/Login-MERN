// ProtectedRoute.jsx

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
