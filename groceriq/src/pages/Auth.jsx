import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import loginImage from "../assets/spices.jpg";

const Auth = () => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && password !== confirm) {
      return setError("Passwords do not match.");
    }

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      alert("Success! 🎉");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-screen flex font-serif bg-[#3e2a20] overflow-hidden">
      {/* Left Side Image */}
      <div className="w-1/2 h-full">
        <img
          src={loginImage}
          alt="Spices"
          className="w-full h-full object-cover rounded-r-[60px]"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-1/2 h-full flex items-center justify-center px-12">
        <div className="bg-[#f5e9dc] rounded-[20px] px-10 py-12 w-[400px] shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#3e2a20]">
            {mode === "login" ? "Login to GrocerIQ" : "Create Your Account"}
          </h2>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-md text-[#3e2a20]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3 bg-[#3e2a20] text-white rounded-full placeholder-gray-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-md text-[#3e2a20]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-3 bg-[#3e2a20] text-white rounded-full placeholder-gray-300 focus:outline-none"
              />
            </div>

            {mode === "signup" && (
              <div>
                <label className="block mb-2 text-md text-[#3e2a20]">Confirm Password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  className="w-full px-5 py-3 bg-[#3e2a20] text-white rounded-full placeholder-gray-300 focus:outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#5c6e1d] text-white py-3 rounded-md font-semibold hover:bg-[#435517] transition"
            >
              {mode === "login" ? "LOGIN" : "SIGN UP"}
            </button>
          </form>

          <p className="text-center text-sm text-[#2a4a3a] mt-6">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <span
                  className="underline font-semibold cursor-pointer"
                  onClick={() => setMode("signup")}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="underline font-semibold cursor-pointer"
                  onClick={() => setMode("login")}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
