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

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    category: "",
    price: "",
    expiry: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    const newItem = {
      ...form,
      added: new Date().toISOString().split("T")[0],
      usage: "⭐⭐",
    };
    setItems([...items, newItem]);
    setShowModal(false);
    setForm({
      name: "",
      quantity: "",
      category: "",
      price: "",
      expiry: "",
    });
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6 relative">
      <h1 className="text-3xl font-bold text-orange-700 mb-6">Your Pantry</h1>

      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-700 transition"
      >
        + Add Item
      </button>

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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-orange-700">Add New Item</h2>

            <div className="space-y-3">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Item name"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Quantity (e.g. 500g)"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category (e.g. Produce)"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Price (USD)"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                name="expiry"
                type="date"
                value={form.expiry}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={addItem}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
