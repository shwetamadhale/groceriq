import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Insights = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(db, "items"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    };
    fetchItems();
  }, []);

  // 💡 Sample calculations:
  const totalSpend = items.reduce((sum, i) => sum + Number(i.price || 0), 0);
  const averagePrice =
    items.length > 0 ? (totalSpend / items.length).toFixed(2) : 0;

  const mostUsed = items
    .sort((a, b) => (b.usage || "").length - (a.usage || "").length)
    .slice(0, 3);

  const expiring = items.filter((i) => {
    const expiry = new Date(i.expiry);
    return (expiry - new Date()) / (1000 * 60 * 60 * 24) <= 2;
  });

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-3xl font-bold text-orange-700 mb-6">
        Usage Insights
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2 text-orange-600">
            Total Spend
          </h2>
          <p className="text-2xl font-bold">${totalSpend.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2 text-orange-600">
            Average Price Per Item
          </h2>
          <p className="text-2xl font-bold">${averagePrice}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow col-span-2">
          <h2 className="text-lg font-semibold mb-2 text-orange-600">
            Most Used Ingredients
          </h2>
          <ul className="list-disc pl-6 text-gray-700">
            {mostUsed.map((item) => (
              <li key={item.id}>
                {item.name} – {item.usage}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow col-span-2">
          <h2 className="text-lg font-semibold mb-2 text-orange-600">
            Expiring Soon (Next 2 Days)
          </h2>
          {expiring.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-700">
              {expiring.map((item) => (
                <li key={item.id}>
                  {item.name} – {item.expiry}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No items expiring soon.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;
