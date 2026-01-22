import React, { useEffect, useState } from "react";
import { API } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function BillDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [bill, setBill] = useState(null);

  useEffect(() => {
    API.get(`/bills/${id}`).then(res => setBill(res.data));
  }, [id]);

  if (!bill) return <div className="page">Loading...</div>;

  const dateStr = new Date(bill.date).toLocaleDateString("hi-IN");
  const timeStr = new Date(bill.date).toLocaleTimeString("hi-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="page">

      {/* Back */}
      <div className="back-btn" onClick={() => nav(-1)}>← वापस जाएँ</div>

      {/* Title */}
      <h2 className="title">बिल विवरण</h2>

      {/* Bill Summary */}
      <div className="card-row" style={{ padding: "20px" }}>
        <div style={{ fontSize: "22px", fontWeight: "700" }}>
          📄 बिल नंबर: {bill.billNo}
        </div>

        <div style={{ fontSize: "20px", marginTop: "10px" }}>
          📅 तारीख: {dateStr}
        </div>

        <div style={{ fontSize: "20px" }}>
          ⏰ समय: {timeStr}
        </div>
      </div>

      {/* Items */}
      {bill.items.map((item, index) => (
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
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "800",
          marginTop: "20px"
        }}
      >
        कुल राशि: ₹{bill.total}
      </div>

    </div>
  );
}
