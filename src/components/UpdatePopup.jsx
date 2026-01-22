export default function UpdatePopup({ item, onClose, onSave }) {
  const [newName, setNewName] = useState(item.name);
  const [newRate, setNewRate] = useState(item.defaultRate);

  const save = () => {
    onSave(newName, newRate);
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={popup}>
        <h3>Update Item</h3>

        <label>Name</label>
        <input value={newName} onChange={e => setNewName(e.target.value)} />

        <label>Rate</label>
        <input
          type="number"
          value={newRate}
          onChange={e => setNewRate(e.target.value)}
        />

        <button onClick={save}>Save</button>
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

