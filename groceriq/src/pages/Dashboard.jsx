import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

// ✅ Category options array
const categoryOptions = [
  "Produce", "Dairy", "Meat", "Seafood", "Grains",
  "Bakery", "Frozen", "Canned", "Beverages", "Snacks",
  "Condiments", "Spices", "Household", "Other"
];

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState("suggestions");
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    category: "",
    price: "",
    expiry: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch items from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "items"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(data);
      },
      (error) => {
        console.error("Error fetching items:", error);
        setError("Failed to load items from database");
      }
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addItem = async () => {
    if (
      !form.name.trim() ||
      !form.quantity.trim() ||
      !form.category.trim() ||
      !form.price ||
      !form.expiry
    ) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const newItem = {
        ...form,
        price: parseFloat(form.price),
        added: new Date().toISOString().split("T")[0],
        usage: "⭐⭐"
      };

      await addDoc(collection(db, "items"), newItem);
      setShowModal(false);
      setForm({
        name: "",
        quantity: "",
        category: "",
        price: "",
        expiry: ""
      });
    } catch (error) {
      console.error("Error adding item:", error);
      setError("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "items", id));
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Failed to delete item. Please try again.");
    }
  };

  const updateUsage = async (id, currentUsage) => {
    try {
      const usageMap = {
        "⭐": "⭐⭐",
        "⭐⭐": "⭐⭐⭐",
        "⭐⭐⭐": "⭐⭐⭐⭐",
        "⭐⭐⭐⭐": "⭐⭐⭐⭐⭐",
        "⭐⭐⭐⭐⭐": "⭐"
      };

      const newUsage = usageMap[currentUsage] || "⭐⭐";
      await updateDoc(doc(db, "items", id), { usage: newUsage });
    } catch (error) {
      console.error("Error updating usage:", error);
      setError("Failed to update usage. Please try again.");
    }
  };

  // Styles (no changes made here)
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f7fee7, #ecfccb, #d9f99d)',
    padding: '2rem',
    fontFamily: 'Georgia, serif'
  };

  const headerStyle = { marginBottom: '2rem' };
  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#365314',
    marginBottom: '0.5rem',
    fontFamily: 'Georgia, serif'
  };

  const subtitleStyle = {
    fontSize: '1.125rem',
    color: '#4d7c0f',
    fontStyle: 'italic',
    marginBottom: '2rem'
  };

  const navStyle = {
    display: 'flex',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const navLinkStyle = {
    color: '#365314',
    fontSize: '1.125rem',
    fontWeight: '500',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: '2px solid transparent'
  };

  const navLinkActiveStyle = {
    ...navLinkStyle,
    backgroundColor: '#365314',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  };

  const tableHeaderStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  };

  const headerButtonStyle = (isActive = false) => ({
    padding: '0.75rem 1.5rem',
    borderRadius: '2rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: isActive ? '#166534' : '#22543d',
    color: 'white',
    transition: 'all 0.2s',
    transform: isActive ? 'translateY(-2px)' : 'none',
    boxShadow: isActive ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
  });

  const tableStyle = {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const tableHeaderRowStyle = {
    backgroundColor: '#f0fdf4',
    borderBottom: '2px solid #bbf7d0'
  };

  const thStyle = {
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#166534',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const tdStyle = {
    padding: '1rem',
    borderBottom: '1px solid #f0f0f0',
    color: '#374151',
    position: 'relative'
  };

  const rowStyle = {
    backgroundColor: 'white',
    transition: 'background-color 0.2s'
  };

  const addButtonStyle = {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    backgroundColor: '#16a34a',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '3rem',
    border: 'none',
    fontSize: '1.125rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s',
    zIndex: 10
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50
  };

  const modalStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '28rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    maxHeight: '90vh',
    overflowY: 'auto'
  };

  const modalTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: '1.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    marginBottom: '1rem',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit'
  };

  const cancelButtonStyle = {
    padding: '0.5rem 1.25rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    fontSize: '0.875rem',
    cursor: 'pointer',
    marginRight: '0.75rem'
  };

  const submitButtonStyle = {
    padding: '0.5rem 1.25rem',
    borderRadius: '0.5rem',
    backgroundColor: '#16a34a',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Smart Grocery Helper</h1>

      <button
        style={addButtonStyle}
        onClick={() => setShowModal(true)}
      >
        + Add Item
      </button>

      {/* ✅ Modal */}
      {showModal && (
        <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalTitleStyle}>Add New Item</h2>

            {error && (
              <div style={{
                backgroundColor: '#fee2e2',
                border: '1px solid #fca5a5',
                color: '#dc2626',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name (e.g., Organic Spinach)"
              style={inputStyle}
              disabled={loading}
            />

            <input
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Quantity (e.g., 500g, 2 pcs)"
              style={inputStyle}
              disabled={loading}
            />

            {/* ✅ Replaced input with dropdown for category */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={inputStyle}
              disabled={loading}
            >
              <option value="">Select Category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              placeholder="Price (USD)"
              style={inputStyle}
              disabled={loading}
            />

            <input
              name="expiry"
              type="date"
              value={form.expiry}
              onChange={handleChange}
              style={inputStyle}
              disabled={loading}
            />

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                style={cancelButtonStyle}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={addItem}
                style={submitButtonStyle}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
