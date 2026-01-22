import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api/api";
import Modal from "../components/Modal";

export default function BillPreview() {
  const { state } = useLocation();
  const nav = useNavigate();

  const { finalBill, total } = state;

  const [showSaveModal, setShowSaveModal] = useState(false);

  const saveBillToDB = async () => {
    await API.post("/bills/new", {
      items: finalBill,
      total: total,
      status: "completed",
      date: new Date()
    });

    setShowSaveModal(false);
    nav("/history"); // after save go to history
  };

  return (
    <div className="page">

      {/* Back */}
      <div className="back-btn" onClick={() => nav(-1)}>← वापस जाएँ</div>

      {/* Title */}
      <h2 className="title">बिल प्रीव्यू</h2>

      {/* Bill Items */}
      {finalBill.map((item, index) => (
        <div className="card-row" key={index}>
          <div style={{ fontSize: "22px", marginBottom: "10px" }}>
            <span className="item-icon">📦</span> {item.name}
          </div>

          <div className="card-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            <div style={{ fontSize: "20px" }}>रेट: ₹{item.rate}</div>
            <div style={{ fontSize: "20px" }}>मात्रा: {item.qty}</div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              ₹{item.subtotal}
            </div>
          </div>
        </div>
      ))}

      {/* Total */}
      <div
        className="card-row"
        style={{ textAlign: "center", fontSize: "26px", fontWeight: "700" }}
      >
        कुल राशि: ₹{total}
      </div>

      {/* Save Bill */}
      <button
        className="btn"
        onClick={() => setShowSaveModal(true)}
      >
        बिल सेव करें
      </button>

      {/* SAVE CONFIRMATION MODAL */}
      {showSaveModal && (
        <Modal
          title="क्या आप बिल सेव करना चाहते हैं?"
          onCancel={() => setShowSaveModal(false)}
          onSave={saveBillToDB}
        >
          <div style={{ fontSize: "22px", textAlign: "center" }}>
            कुल राशि: ₹{total}
          </div>
        </Modal>
      )}
    </div>
  );
}
