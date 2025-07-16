import { useNavigate } from "react-router-dom";
import foodImage from "../assets/landing.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex font-serif">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-[#f0ffa8] text-[#4d5b2a]">
        <h2 className="text-xl font-bold italic">GrocerIQ</h2>
        <p className="text-base mt-1">
          Optimizing Your Kitchen for Less Waste and More Flavor!
        </p>

        <h1 className="text-6xl font-extrabold leading-tight mt-10 tracking-tight">
          SAVE MONEY,<br />SAVE TIME,<br />SAVE FOOD.
        </h1>

        <div className="flex gap-6 mt-12">
          <button
            onClick={() => navigate("/auth")}
            className="bg-[#4d5b2a] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#39451f] transition"
          >
            SIGN UP NOW
          </button>
          <button
            onClick={() => navigate("/auth")}
            className="bg-[#4d5b2a] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#39451f] transition"
          >
            RETURNING USER? LOGIN
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-full">
        <img
          src={foodImage}
          alt="Prepared meals and drinks"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Landing;
