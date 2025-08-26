import { useNavigate } from "react-router-dom";
import foodImage from "../assets/landing.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex font-sans overflow-hidden relative">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-gradient-to-br from-lime-100 to-lime-200 text-green-900 relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-lime-200 opacity-20 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-200 opacity-30 rounded-full translate-x-12 translate-y-12"></div>
        <div className="absolute top-1/3 right-8 w-16 h-16 border-4 border-green-200 opacity-30 rotate-45"></div>
        
        {/* Brand Header */}
        <div className="mb-12 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-green-800 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">G</span>
            </div>
            <div>
              <h2 className="text-5xl font-bold text-green-800">GrocerIQ</h2>
              <div className="w-28 h-1.5 bg-gradient-to-r from-lime-400 to-green-500 rounded-full mt-2"></div>
            </div>
          </div>
          <p className="text-xl text-green-700 leading-relaxed">
            Optimizing Your Kitchen for Less Waste and<br />
            More Flavor!
          </p>
        </div>

        {/* Main Heading */}
        <div className="mb-16 relative z-10">
          <h1 className="text-7xl font-bold leading-tight text-green-900">
            <span className="block transform hover:scale-105 transition-transform duration-300 cursor-default">
              SAVE MONEY,
            </span>
            <span className="block text-lime-600 transform hover:scale-105 transition-transform duration-300 delay-75 cursor-default">
              SAVE TIME,
            </span>
            <span className="block text-green-800 transform hover:scale-105 transition-transform duration-300 delay-150 cursor-default">
              SAVE FOOD.
            </span>
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-lime-400 via-green-500 to-green-600 rounded-full shadow-lg mt-4"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 relative z-10">
          <button
            onClick={() => navigate("/signup")}
            className="group bg-green-800 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-200 hover:bg-green-900 hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-800/30 transform hover:-translate-y-1 relative overflow-hidden"
          >
            <span className="relative z-10">SIGN UP NOW</span>
            <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
          <button
            onClick={() => navigate("/login")}
            className="group bg-transparent border-3 border-green-800 text-green-800 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-200 hover:bg-green-800 hover:text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden"
          >
            <span className="relative z-10">RETURNING USER? LOGIN</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </button>
        </div>

        {/* Feature highlights */}
        <div className="absolute bottom-10 left-16 flex gap-12 text-sm text-green-600 font-medium">
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse shadow-md group-hover:scale-125 transition-transform duration-300"></div>
            <span className="group-hover:text-green-800 transition-colors duration-300">Smart Pantry Management</span>
          </div>
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-200 shadow-md group-hover:scale-125 transition-transform duration-300"></div>
            <span className="group-hover:text-green-800 transition-colors duration-300">AI-Powered Suggestions</span>
          </div>
        </div>
      </div>

      {/* Right Section - Food Image */}
      <div className="w-1/2 h-full relative overflow-hidden group">
        <img
          src={foodImage}
          alt="Fresh healthy meals with vibrant ingredients showcasing smart kitchen management"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        
        {/* Enhanced fallback if image doesn't load */}
        <div className="w-full h-full bg-gradient-to-br from-orange-200 via-red-200 to-pink-200 flex items-center justify-center text-4xl text-green-800 hidden relative">
          {/* Artistic food representation */}
          <div className="relative transform group-hover:scale-105 transition-transform duration-500">
            {/* Main bowl */}
            <div className="w-80 h-60 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full relative shadow-2xl border-8 border-white/40">
              {/* Colorful ingredients */}
              <div className="absolute top-8 left-12 w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-lg animate-float"></div>
              <div className="absolute top-12 right-16 w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-lg animate-float-delayed"></div>
              <div className="absolute bottom-16 left-20 w-14 h-14 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full shadow-lg animate-float-delayed-2"></div>
              <div className="absolute bottom-12 right-12 w-10 h-10 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full shadow-lg animate-float-delayed-3"></div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end justify-center pb-16">
            <div className="text-center text-white bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/20">
              <h3 className="text-3xl font-bold mb-2">Fresh Ingredients</h3>
              <p className="text-lg opacity-90">Smart Kitchen Solutions</p>
            </div>
          </div>
        </div>

        {/* Image overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/10"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-12 right-12 w-16 h-16 border-4 border-white/50 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-24 left-12 w-12 h-12 border-4 border-white/40 rotate-12 animate-pulse"></div>
        
        {/* Content overlay */}
        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-white/50 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-xl font-bold text-green-800 mb-2">Start Your Journey</h3>
          <p className="text-green-600 text-sm">Join thousands reducing food waste</p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .animate-float-delayed-2 {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-delayed-3 {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default Landing;