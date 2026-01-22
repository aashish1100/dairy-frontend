export default function ItemRow({ item, onRateChange, onQtyChange }) {
  return (
    <div style={row}>
      <div style={{ width: "120px" }}>{item.name}</div>

      <input
        type="number"
        value={item.defaultRate}
        onChange={e => onRateChange(e.target.value)}
        style={input}
      />

      <input
        type="number"
        placeholder="Qty"
        onChange={e => onQtyChange(e.target.value)}
        style={input}
      />
    </div>
  );
}

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  borderBottom: "1px solid #ddd",
};

const input = {
  width: "80px",
  fontSize: "16px",
};
