// smartgrocery/client/src/components/RequiresOnboarding.js
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RequireOnboarding = ({ children }) => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/${userId}/onboarding-status`);
        if (!response.data.completed) {
          navigate("/preferences", { replace: true });
        } else {
          setLoading(false);
        }
      } catch (error) {
        navigate("/preferences", { replace: true });
      }
    };

    checkOnboarding();
  }, [userId, navigate]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default RequireOnboarding;