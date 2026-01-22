import { useState } from "react";

export default function StockPopup({ item, onClose, onSave }) {
  const [addQty, setAddQty] = useState("");
  const [removeQty, setRemoveQty] = useState("");
  const [newTotal, setNewTotal] = useState("");

  const submit = () => {
    onSave({ addQty, removeQty, newTotal });
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={popup}>
        <h3>Update Stock: {item.name}</h3>

        <p>Current Stock: {item.stock}</p>

        <label>Add Quantity</label>
        <input
          type="number"
          value={addQty}
          onChange={e => setAddQty(e.target.value)}
        />

        <label>Remove Quantity</label>
        <input
          type="number"
          value={removeQty}
          onChange={e => setRemoveQty(e.target.value)}
        />

        <label>Set New Total Stock</label>
        <input
          type="number"
          value={newTotal}
          onChange={e => setNewTotal(e.target.value)}
        />

        <button onClick={submit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const popup = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
