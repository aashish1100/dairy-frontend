import { useState } from "react";

export default function AddItemPopup({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [stock, setStock] = useState("");

  const save = () => {
    onSave(name, rate, stock);
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={popup}>
        <h3>Add New Item</h3>

        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} />

        <label>Rate</label>
        <input
          type="number"
          value={rate}
          onChange={e => setRate(e.target.value)}
        />

        <label>Initial Stock</label>
        <input
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />

        <button onClick={save}>Add</button>
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
