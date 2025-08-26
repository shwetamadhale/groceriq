import { useNavigate } from "react-router-dom";
import foodImage from "../assets/landing.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex font-serif overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-[#f0ffa8] text-[#4d5b2a]">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold italic text-[#4d5b2a] mb-2">GrocerIQ</h2>
          <p className="text-lg text-[#6b7a3e] font-medium">
            Optimizing Your Kitchen for Less Waste and<br />
            More Flavor!
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="text-7xl font-black leading-none mb-16 tracking-tight text-[#4d5b2a]">
          SAVE MONEY,<br />
          SAVE TIME,<br />
          SAVE FOOD.
        </h1>

        {/* Buttons */}
        <div className="flex gap-8">
          // In Landing.jsx, update the buttons:
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#4d5b2a] text-white px-8 py-4 text-lg font-bold tracking-wide hover:bg-[#39451f] transition-colors duration-200 shadow-lg"
          >
            SIGN UP NOW
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#4d5b2a] text-white px-8 py-4 text-lg font-bold tracking-wide hover:bg-[#39451f] transition-colors duration-200 shadow-lg"
          >
            RETURNING USER? LOGIN
          </button>
        </div>
      </div>

      {/* Right Section - Food Image */}
      <div className="w-1/2 h-full">
        <img
          src={foodImage}
          alt="Delicious prepared meals"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        
        {/* Fallback if image doesn't load */}
        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-4xl text-[#4d5b2a] hidden">
          Beautiful Food Images Coming Soon
        </div>
      </div>
    </div>
  );
};

export default Landing;