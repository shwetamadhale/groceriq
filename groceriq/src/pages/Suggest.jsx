import { useState } from "react";

const Suggest = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse(`🤖 Mock AI Response: "${query}" (real AI coming soon)`);
  };

  const cards = [
    {
      title: "🛒 Items to Rebuy Soon",
      desc: "Based on your usage, these might run out soon: eggs, milk, spinach.",
    },
    {
      title: "⏰ Expiring Items",
      desc: "Use these soon: yogurt (2 days), cilantro (3 days), tomatoes (4 days).",
    },
    {
      title: "🚫 Don’t Rebuy Yet",
      desc: "These items haven't been used much: lentils, oat milk.",
    },
    {
      title: "🧪 Try Something New",
      desc: "You’ve never tried stir-fry with tofu. Want a recipe?",
    },
    {
      title: "💸 Budget Smart Picks",
      desc: "Based on your $100 budget: rice, chickpeas, frozen veggies, chicken thighs.",
    },
  ];

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-orange-700">Smart Suggestions</h1>

      {/* AI Prompt Box */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask AI: What should I stock this week?"
          className="w-full p-4 rounded-lg border border-orange-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </form>

      {/* Fake response */}
      {response && (
        <div className="mb-6 p-4 bg-white border-l-4 border-orange-500 rounded-lg shadow text-gray-700">
          {response}
        </div>
      )}

      {/* Suggestion Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-orange-100">
            <h2 className="text-lg font-semibold mb-2 text-orange-600">{card.title}</h2>
            <p className="text-gray-700">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggest;
