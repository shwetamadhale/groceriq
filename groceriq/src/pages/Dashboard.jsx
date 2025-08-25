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

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    category: "",
    price: "",
    expiry: "",
  });

  // Fetch real data from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      setItems(data);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addItem = async () => {
    try {
      const newItem = {
        ...form,
        price: parseFloat(form.price),
        added: new Date().toISOString().split("T")[0],
        usage: "⭐⭐",
      };

      await addDoc(collection(db, "items"), newItem);
      setShowModal(false);
      setForm({
        name: "",
        quantity: "",
        category: "",
        price: "",
        expiry: "",
      });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "items", id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  
  // Inline styles
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f7fee7, #ecfccb, #d9f99d)',
    padding: '2rem',
    fontFamily: 'Georgia, serif'
  };

  const headerStyle = {
    marginBottom: '2rem'
  };

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
    transition: 'background-color 0.2s',
    cursor: 'pointer'
  };

  const navLinkActiveStyle = {
    ...navLinkStyle,
    backgroundColor: '#a3a3a3',
    color: 'white'
  };

  const tableHeaderStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
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
    transition: 'background-color 0.2s'
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
    color: '#374151'
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
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  };

  const modalTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: '1.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    marginBottom: '1rem',
    transition: 'border-color 0.2s'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151',
    marginRight: '1rem'
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#16a34a',
    color: 'white'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Hi User Name!</h1>
        <p style={subtitleStyle}>Here's your harvest.</p>
        
        {/* Navigation */}
        <div style={navStyle}>
          <div style={navLinkActiveStyle}>Suggestions</div>
          <div style={navLinkStyle}>Insights</div>
          <div style={navLinkStyle}>Profile</div>
        </div>

        {/* Table Headers */}
        <div style={tableHeaderStyle}>
          <button style={headerButtonStyle(true)}>+ Add Item</button>
          <button style={headerButtonStyle()}>Quantity</button>
          <button style={headerButtonStyle()}>Category</button>
          <button style={headerButtonStyle()}>Price</button>
          <button style={headerButtonStyle()}>Expiry</button>
          <button style={headerButtonStyle()}>Date Added</button>
          <button style={headerButtonStyle()}>Usage</button>
        </div>
      </div>

      {/* Table */}
      <div style={tableStyle}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={tableHeaderRowStyle}>
              <th style={thStyle}>Item</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Expiry</th>
              <th style={thStyle}>Date Added</th>
              <th style={thStyle}>Usage</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id || i} style={rowStyle}>
                <td style={tdStyle}>
                  <div style={{ fontWeight: '600', color: '#166534' }}>
                    {item.name}
                  </div>
                </td>
                <td style={tdStyle}>{item.quantity}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    {item.category}
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ fontWeight: '600', color: '#059669' }}>
                    ${item.price}
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{
                    color: new Date(item.expiry) <= new Date(Date.now() + 7*24*60*60*1000) ? '#dc2626' : '#374151'
                  }}>
                    {item.expiry}
                  </span>
                </td>
                <td style={tdStyle}>{item.added}</td>
                <td style={tdStyle}>
                  <span style={{ fontSize: '1.125rem' }}>
                    {item.usage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🥬</div>
          <h3 style={{ fontSize: '1.5rem', color: '#166534', marginBottom: '0.5rem' }}>
            Your pantry is empty
          </h3>
          <p style={{ color: '#6b7280' }}>
            Start building your harvest by adding your first item!
          </p>
        </div>
      )}

      {/* Add Item Button */}
      <button
        onClick={() => setShowModal(true)}
        style={addButtonStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
      >
        + Add Item
      </button>

      {/* Modal */}
      {showModal && (
        <div style={modalOverlayStyle} onClick={() => setShowModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalTitleStyle}>Add New Item</h2>

            <div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Item name (e.g., Organic Spinach)"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Quantity (e.g., 500g, 1 lb, 2 pieces)"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                onBlur={(e) => e.target.style.borderColor = '#d1dbd7b7'}
              />
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category (e.g., Produce, Dairy, Grains)"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                onBlur={(e) => e.target.style.borderColor = '#d1dbd7b7'}
              />
              <input
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="Price (USD)"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <input
                name="expiry"
                type="date"
                value={form.expiry}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                style={cancelButtonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              >
                Cancel
              </button>
              <button
                onClick={addItem}
                style={submitButtonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;