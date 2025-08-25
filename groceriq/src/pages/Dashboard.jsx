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

// ✅ Add category options at the top of the component
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
    expiry: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ... other code remains unchanged

  return (
    <div style={containerStyle}>
      {/* ... UI content above remains unchanged */}

      {/* Modal */}
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

            <div>
              {/* ✅ Updated name input placeholder */}
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name (e.g., Organic Spinach)"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                disabled={loading}
              />

              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Quantity (e.g., 500g, 1 lb, 2 pieces)"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                disabled={loading}
              />

              {/* ✅ Replaced category input with select dropdown */}
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
                onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                disabled={loading}
              />
              <input
                name="expiry"
                type="date"
                value={form.expiry}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                disabled={loading}
              />
            </div>

            {/* Modal buttons */}
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                style={cancelButtonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={addItem}
                style={submitButtonStyle}
                onMouseEnter={(e) => {
                  if (!loading) e.target.style.backgroundColor = '#15803d';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.target.style.backgroundColor = '#16a34a';
                }}
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
