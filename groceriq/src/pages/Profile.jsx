import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    preferences: {}
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      setUserData({
        displayName: auth.currentUser.displayName || "",
        email: auth.currentUser.email || "",
        preferences: auth.currentUser.preferences || {}
      });
    }
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: userData.displayName
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Your Profile</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                What should we call you?
              </label>
              <input
                type="text"
                value={userData.displayName}
                onChange={(e) => setUserData({...userData, displayName: e.target.value})}
                placeholder="Enter your name"
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={userData.email}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={() => navigate('/onboarding')}
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600"
            >
              Edit Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;