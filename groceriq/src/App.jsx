const App = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-100 via-orange-50 to-pink-100 p-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-orange-700">GrocerIQ</h1>
        <p className="text-xl md:text-2xl font-semibold text-gray-700">
          Save Money, Save Time, Save Food.
        </p>
        <p className="mt-2 text-md md:text-lg">
          Optimizing your kitchen for less waste and more flavor!
        </p>
        <div className="mt-6 space-x-4">
          <button className="bg-orange-600 text-white px-6 py-2 rounded-xl hover:bg-orange-700 transition">
            Sign Up
          </button>
          <button className="bg-white border border-orange-600 text-orange-600 px-6 py-2 rounded-xl hover:bg-orange-100 transition">
            Learn More
          </button>
        </div>
        <p className="mt-4 text-sm">
          RETURNING USER?{" "}
          <a href="#" className="text-orange-700 underline hover:text-orange-900">LOGIN</a>
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 grid gap-10 md:grid-cols-3 text-left bg-white">
        <div className="shadow-md p-6 rounded-xl border border-orange-100">
          <h2 className="text-xl font-bold text-orange-700 mb-2">Smart Inventory</h2>
          <p>Track ingredients, expiration dates, and quantities in one place. Reduce waste with automatic alerts.</p>
        </div>

        <div className="shadow-md p-6 rounded-xl border border-orange-100">
          <h2 className="text-xl font-bold text-orange-700 mb-2">AI Meal & Shopping Suggestions</h2>
          <p>Get meal ideas based on what you have. Receive smart reminders to never overbuy or forget essentials.</p>
        </div>

        <div className="shadow-md p-6 rounded-xl border border-orange-100">
          <h2 className="text-xl font-bold text-orange-700 mb-2">Personalized Budget Planning</h2>
          <p>Set your budget and get meals within your price range. Plan around your taste, diet, and favorite cuisines.</p>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="text-center py-10 bg-orange-50">
        <h3 className="text-xl font-semibold mb-2">Ready to join us?</h3>
        <button className="bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition">
          SIGN UP NOW
        </button>
      </footer>
    </div>
  );
};

export default App;
