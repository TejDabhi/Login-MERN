import { BrowserRouter, Route, Routes } from "react-router-dom"

import Signup from "./Signup"
import Login from "./Login"
import Home from "./Home"
import ForgotPassword from "./ForgotPassword"
import ResetPassword from "./ResetPassword"
import ProtectedRoute from "./ProtectedRoute"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/forgotPassword"
          element={<ForgotPassword />}
        />

        <Route
          path="/resetPassword/:id/:token"
          element={<ResetPassword />}
        />

        {/* Protected Route */}
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