import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Suggest from "./pages/Suggest";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/onboarding" element={
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
      } />
      
      <Route path="/suggest" element={
        <ProtectedRoute>
          <Suggest />
        </ProtectedRoute>
      } />
      
      <Route path="/insights" element={
        <ProtectedRoute>
          <Insights />
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
    </Routes>
  );
};

export default App;