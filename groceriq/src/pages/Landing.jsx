import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <section className="bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 p-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-orange-700">GrocerIQ</h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-700">
          Save Money, Save Time, Save Food.
        </p>
        <p className="mt-2 text-md md:text-lg">
          Optimizing your kitchen for less waste and more flavor!
        </p>
        <div className="mt-6 space-x-4">
          <button
            onClick={() => navigate("/auth")}
            className="bg-orange-600 text-white px-6 py-2 rounded-xl hover:bg-orange-700 transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/learn")}
            className="bg-white border border-orange-600 text-orange-600 px-6 py-2 rounded-xl hover:bg-orange-100 transition"
          >
            Learn More
          </button>
        </div>
        <p className="mt-4 text-sm">
          RETURNING USER?{" "}
          <span
            onClick={() => navigate("/auth")}
            className="text-orange-700 underline hover:text-orange-900 cursor-pointer"
          >
            LOGIN
          </span>
        </p>
      </section>
    </div>
  );
};

export default Landing;
