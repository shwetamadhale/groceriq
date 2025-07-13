import { useState } from "react";

const Dashboard = () => {
  const [items, setItems] = useState([
    {
      name: "Milk",
      quantity: "1 L",
      category: "Dairy",
      price: 3.5,
      expiry: "2025-07-18",
      added: "2025-07-12",
      usage: "⭐⭐⭐",
    },
    {
      name: "Spinach",
      quantity: "200 g",
      category: "Produce",
      price: 2,
      expiry: "2025-07-14",
      added: "2025-07-10",
      usage: "⭐⭐⭐⭐",
    },
  ]);

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="text-3xl font-bold text-orange-700 mb-6">Your Pantry</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white rounded-xl overflow-hidden shadow">
          <thead className="bg-orange-100 text-left">
            <tr>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Expiry</th>
              <th className="px-4 py-2">Date Added</th>
              <th className="px-4 py-2">Usage</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">${item.price}</td>
                <td className="px-4 py-2">{item.expiry}</td>
                <td className="px-4 py-2">{item.added}</td>
                <td className="px-4 py-2">{item.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
