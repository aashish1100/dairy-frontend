import React, { useEffect, useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function BillHistory() {
  const [bills, setBills] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    API.get("/bills/all").then(res => setBills(res.data));
  }, []);

  return (
    <div className="page">

      {/* Back */}
      <div className="back-btn" onClick={() => nav(-1)}>
        ← वापस जाएँ
      </div>

      {/* Title */}
      <h2 className="title">बिल इतिहास</h2>

      {bills.length === 0 && (
        <h3 style={{ textAlign: "center", fontSize: "22px", marginTop: "30px" }}>
          कोई बिल नहीं मिला
        </h3>
      )}

      {/* BILL LIST */}
      {bills.map((b) => {
        const dateStr = new Date(b.date).toLocaleDateString("hi-IN");

        return (
          <div
            key={b._id}
            className="card-row"
            onClick={() => nav(`/bill/${b._id}`)}
            style={{
              cursor: "pointer",
              padding: "20px"
            }}
          >
            <div style={{ fontSize: "22px", fontWeight: "700", marginBottom: "10px" }}>
              📄 बिल #{b.billNo}
            </div>

            <div
              className="card-grid"
              style={{ gridTemplateColumns: "1fr 1fr", fontSize: "20px" }}
            >
              <div>📅 {dateStr}</div>
              <div style={{ fontWeight: "700", textAlign: "right" }}>
                ₹{b.total}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
