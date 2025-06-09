import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <SignedIn>
            <Navigate to="/dashboard" />
          </SignedIn>
          <SignedOut>
            <Navigate to="/login" />
          </SignedOut>
        </>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={
        <>
          <SignedIn>
            <Dashboard />
          </SignedIn>
          <SignedOut>
            <Navigate to="/login" />
          </SignedOut>
        </>
      } />
    </Routes>
  );
}

export default App;