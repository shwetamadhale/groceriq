// smartgrocery/client/src/App.js
import { useUser } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RequireOnboarding from "./components/RequiresOnboarding";
import Dashboard from "./pages/Dashboard";
import Preferences from "./pages/Preferences";
import Budget from "./pages/Budget";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";

function App() {
  const { isSignedIn } = useUser();

  return (
    <>
      {isSignedIn && <Navbar />}
      
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/preferences"
          element={
            <RequireOnboarding>
              <Preferences />
            </RequireOnboarding>
          }
        />
        <Route
          path="/budget"
          element={
            <RequireOnboarding>
              <Budget />
            </RequireOnboarding>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireOnboarding>
              <Dashboard />
            </RequireOnboarding>
          }
        />

        {/* Redirects */}
        <Route
          path="/"
          element={
            isSignedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;