import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Suggest = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const pantryRef = collection(db, "items");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const snapshot = await getDocs(pantryRef);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
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
      title: "🚫 Don't Rebuy",
      desc: lowUsage.length
        ? lowUsage.map((i) => `• ${i.name} – low usage`).join("\n")
        : "All items seem to be in use.",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse("");

    try {
      // Create context from pantry items
      const pantryContext = items.length > 0 
        ? `Current pantry items: ${items.map(item => `${item.name} (${item.quantity})`).join(', ')}`
        : "No pantry items currently tracked.";

      const systemPrompt = `You are GrocerIQ, a helpful food assistant. Help users with cooking, meal planning, and grocery suggestions. 

User's current pantry: ${pantryContext}

Provide practical, helpful cooking and food advice. If asked about recipes, give simple step-by-step instructions. If asked about meal ideas, suggest dishes they can make with available ingredients.`;

      console.log("🔑 API Key check:", import.meta.env.VITE_GROQ_API_KEY ? "Present" : "Missing");
      console.log("📝 Sending query:", query);

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: query,
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      console.log("📡 Response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ API Error Response:", errorText);
        throw new Error(`API request failed with status ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log("🧠 Full Groq response:", data);

      const reply = data?.choices?.[0]?.message?.content;
      
      if (!reply) {
        console.error("❌ No content in response:", data);
        setResponse("⚠️ AI response was empty. Please try rephrasing your question.");
      } else {
        setResponse(reply);
      }

    } catch (err) {
      console.error("❌ Groq API error:", err);
      setResponse(`⚠️ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-orange-700">Smart Suggestions</h1>

      {/* AI Prompt Box */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI: What can I make with eggs? or What should I cook tonight?"
            className="flex-1 p-4 rounded-lg border border-orange-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "🤔" : "Ask"}
          </button>
        </div>
      </form>

      {/* AI Response */}
      {loading && (
        <div className="mb-6 p-4 bg-white border-l-4 border-orange-500 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-600 border-t-transparent"></div>
            <span>Thinking... 🤔</span>
          </div>
        </div>
      )}

      {response && !loading && (
        <div className="mb-6 p-4 bg-white border-l-4 border-orange-500 rounded-lg shadow text-gray-700 whitespace-pre-wrap">
          <h3 className="font-semibold text-orange-700 mb-2">🤖 GrocerIQ says:</h3>
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

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm">
          <h3 className="font-semibold mb-2">Debug Info:</h3>
          <p>API Key: {import.meta.env.VITE_GROQ_API_KEY ? "✅ Present" : "❌ Missing"}</p>
          <p>Pantry Items: {items.length}</p>
          <p>Items: {items.map(i => i.name).join(', ') || 'None'}</p>
        </div>
      )}
    </div>
  );
};

export default Suggest;