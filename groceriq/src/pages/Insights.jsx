import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Insights = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    });

    return () => unsubscribe();
  }, []);

  // Real calculations with actual data
  const totalSpend = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);
  const averagePrice = items.length > 0 ? (totalSpend / items.length).toFixed(2) : 0;

  const mostUsed = items
    .slice() // Clone to avoid mutating original array during sort
    .sort((a, b) => (b.usage || "").length - (a.usage || "").length)
    .slice(0, 3);

  const expiring = items.filter((i) => {
    if (!i.expiry) return false;
    const expiry = new Date(i.expiry);
    const today = new Date();
    const daysLeft = (expiry - today) / (1000 * 60 * 60 * 24);
    return daysLeft <= 2 && daysLeft >= 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-800 mb-8 text-center">
          📊 Usage Insights
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Total Spend Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-200">
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <h2 className="text-lg font-semibold text-orange-700 mb-2">
                Total Spend
              </h2>
              <p className="text-3xl font-bold text-green-600">${totalSpend.toFixed(2)}</p>
            </div>
          </div>

          {/* Average Price Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-200">
            <div className="text-center">
              <div className="text-3xl mb-2">📦</div>
              <h2 className="text-lg font-semibold text-orange-700 mb-2">
                Average Price
              </h2>
              <p className="text-3xl font-bold text-blue-600">${averagePrice}</p>
            </div>
          </div>

          {/* Item Count Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-200">
            <div className="text-center">
              <div className="text-3xl mb-2">🛒</div>
              <h2 className="text-lg font-semibold text-orange-700 mb-2">
                Total Items
              </h2>
              <p className="text-3xl font-bold text-purple-600">{items.length}</p>
            </div>
          </div>

          {/* Most Used Ingredients */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-200 md:col-span-2">
            <h2 className="text-xl font-semibold text-orange-700 mb-4 flex items-center gap-2">
              ⭐ Most Used Ingredients
            </h2>
            {mostUsed.length > 0 ? (
              <div className="space-y-3">
                {mostUsed.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium text-orange-900">{item.name}</span>
                    <span className="text-2xl">{item.usage}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No usage data yet</p>
            )}
          </div>

          {/* Expiring Soon */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-200 md:col-span-2 lg:col-span-1">
            <h2 className="text-xl font-semibold text-orange-700 mb-4 flex items-center gap-2">
              ⏰ Expiring Soon (Next 2 Days)
            </h2>
            {expiring.length > 0 ? (
              <div className="space-y-3">
                {expiring.map((item) => (
                  <div key={item.id} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <div className="font-medium text-red-900">{item.name}</div>
                    <div className="text-sm text-red-700">Expires: {item.expiry}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No items expiring soon</p>
            )}
          </div>
          </div>
        </div>
      </div>
    );
  };

export default Insights;
