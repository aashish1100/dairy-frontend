import { useEffect, useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function Sell() {
  const [items, setItems] = useState([]);
  const [rateValue, setRateValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showRateModal, setShowRateModal] = useState(false);

  const nav = useNavigate();

  // LOAD ITEMS
  useEffect(() => {
    API.get("/items/all").then((res) => {
      const list = res.data.map(i => ({ ...i, qty: "" }));
      setItems(list);
    });
  }, []);

  // OPEN RATE MODAL
  const openRateModal = (item) => {
    setSelectedItem(item);
    setRateValue(item.defaultRate);
    setShowRateModal(true);
  };

  // SAVE RATE
  const saveRate = async () => {
    await API.put(`/items/update/${selectedItem._id}`, {
      defaultRate: Number(rateValue)
    });

    const updated = items.map(i =>
      i._id === selectedItem._id ? { ...i, defaultRate: Number(rateValue) } : i
    );

    setItems(updated);
    setShowRateModal(false);
  };

  // UPDATE QTY DIRECTLY
  const updateQty = (id, qty) => {
    const updated = items.map(i =>
      i._id === id ? { ...i, qty } : i
    );
    setItems(updated);
  };

  // GENERATE BILL
  const generateBill = () => {
    const selected = items.filter(i => Number(i.qty) > 0);

    if (selected.length === 0) {
      alert("कृपया मात्रा दर्ज करें");
      return;
    }

    const finalBill = selected.map(i => ({
      name: i.name,
      rate: i.defaultRate,
      qty: Number(i.qty),
      subtotal: i.defaultRate * Number(i.qty),
    }));

    const total = finalBill.reduce((acc, i) => acc + i.subtotal, 0);

    nav("/bill-preview", {
      state: { finalBill, total },
    });
  };

  return (
    <div className="page">
      
      {/* Back */}
      <div className="back-btn" onClick={() => nav(-1)}>← वापस जाएँ</div>

      {/* Title */}
      <h2 className="title">सामान बेचें</h2>

      {/* Table Header */}
      <div className="table-head">
        <div>सामान</div>
        <div>रेट</div>
        <div>मात्रा</div>
      </div>

      {/* ITEMS LIST */}
      {items.map((item) => (
        <div className="card-row" key={item._id}>
          <div className="sell-row">
            
            {/* ITEM NAME */}
            <div className="sell-name">
              
              {item.name}
            </div>

            {/* RATE BOX */}
            <input
              type="number"
              className="input-box sell-rate"
              style={{ background: "#eef3ff", cursor: "pointer" }}
              value={item.defaultRate}
              readOnly
              onClick={() => openRateModal(item)}
            />

            {/* QTY BOX */}
            <input
              type="number"
              className="input-box sell-qty"
              placeholder="0"
              value={item.qty}
              onChange={(e) => updateQty(item._id, e.target.value)}
            />
          </div>
        </div>
      ))}

      {/* GENERATE BILL BUTTON */}
      <button className="btn" onClick={generateBill}>
        बिल बनाएँ
      </button>

      {/* RATE UPDATE MODAL */}
      {showRateModal && (
        <Modal
          title="रेट अपडेट करें"
          onCancel={() => setShowRateModal(false)}
          onSave={saveRate}
        >
          <input
            className="input-box"
            type="number"
            value={rateValue}
            onChange={(e) => setRateValue(e.target.value)}
          />
        </Modal>
      )}

    </div>
  );
}
