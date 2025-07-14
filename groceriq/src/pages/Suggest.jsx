import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Suggest = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const pantryRef = collection(db, "items");

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(pantryRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    };
    fetchItems();
  }, []);

  // 🔍 Categorize based on pantry data
  const now = new Date();
  const expiringSoon = items.filter((item) => {
    const expiry = new Date(item.expiry);
    const daysLeft = (expiry - now) / (1000 * 60 * 60 * 24);
    return daysLeft <= 3;
  });

  const lowUsage = items.filter((item) => (item.usage || "⭐⭐").length <= 2);
  const restockSoon = items.filter((item) => {
    return item.quantity.toLowerCase().includes("low") || item.quantity === "0";
  });

  const cards = [
    {
      title: "⏰ Expiring Soon",
      desc: expiringSoon.length
        ? expiringSoon.map((i) => `• ${i.name} (${i.expiry})`).join("\n")
        : "No items expiring in the next 3 days.",
    },
    {
      title: "🛒 Restock Likely",
      desc: restockSoon.length
        ? restockSoon.map((i) => `• ${i.name} – ${i.quantity}`).join("\n")
        : "Nothing looks low right now.",
    },
    {
      title: "🚫 Don’t Rebuy",
      desc: lowUsage.length
        ? lowUsage.map((i) => `• ${i.name} – low usage`).join("\n")
        : "All items seem to be in use.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse(`🤖 (Mock AI): "${query}" based on ${items.length} pantry items`);
  };

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

      {/* AI Response */}
      {response && (
        <div className="mb-6 p-4 bg-white border-l-4 border-orange-500 rounded-lg shadow text-gray-700 whitespace-pre-line">
          {response}
        </div>
      )}

      {/* Smart Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md border border-orange-100 whitespace-pre-line"
          >
            <h2 className="text-lg font-semibold mb-2 text-orange-600">
              {card.title}
            </h2>
            <p className="text-gray-700">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggest;
