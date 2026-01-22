import React, { useEffect, useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Report() {
  const [data, setData] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    API.get("/bills/report/today").then((res) => setData(res.data));
  }, []);

  if (!data)
    return (
      <div className="page">
        <h3 style={{ textAlign: "center", marginTop: "40px" }}>Loading...</h3>
      </div>
    );

  const dateStr = new Date(data.date).toLocaleDateString("hi-IN");

  return (
    <div className="page">

      {/* Back */}
      <div className="back-btn" onClick={() => nav(-1)}>
        ← वापस जाएँ
      </div>

      {/* Title */}
      <h2 className="title">आज की रिपोर्ट</h2>

      {/* DATE */}
      <div
        className="card-row"
        style={{
          fontSize: "22px",
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        📅 तारीख: {dateStr}
      </div>

      {/* SOLD ITEMS */}
      <div className="section-title">आज की बिक्री</div>

      {Object.keys(data.sold).length === 0 ? (
        <div className="card-row" style={{ fontSize: "20px" }}>
          आज कोई बिक्री नहीं हुई
        </div>
      ) : (
        Object.keys(data.sold).map((name) => (
          <div className="report-row" key={name}>
            <div style={{ fontSize: "20px" }}>📦 {name}</div>
            <div style={{ fontSize: "20px" }}>{data.sold[name].qty}</div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              ₹{data.sold[name].amount}
            </div>
          </div>
        ))
      )}

      {/* STOCK LEFT */}
      <div className="section-title">बचा हुआ स्टॉक</div>

      {data.remainingStock.map((item, index) => (
        <div className="report-row" key={index}>
          <div style={{ fontSize: "20px" }}>📦 {item.name}</div>
          <div style={{ fontSize: "20px" }}>{item.stock}</div>
          <div></div>
        </div>
      ))}

      {/* TOTAL EARNINGS */}
      <div
        className="card-row"
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "26px",
          fontWeight: "800",
        }}
      >
        कुल बिक्री: ₹{data.totalEarning}
      </div>
    </div>
  );
}
