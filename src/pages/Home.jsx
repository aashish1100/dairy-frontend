import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="page">

      <h2 className="title">मुकेश खोया भंडार</h2>
      {/* <h2 className="title">मुकेश डेयरी</h2> */}

      <div 
        className="card-row" 
        onClick={() => nav("/sell")}
        style={{ cursor: "pointer", fontSize: "24px" }}
      >
        🧾  सामान बेचें (Sell)
      </div>

      <div 
        className="card-row"
        onClick={() => nav("/history")}
        style={{ cursor: "pointer", fontSize: "24px" }}
      >
        📚  बिल इतिहास
      </div>

      <div 
        className="card-row"
        onClick={() => nav("/update-items")}
        style={{ cursor: "pointer", fontSize: "24px" }}
      >
        🧺  आइटम अपडेट करें
      </div>

      <div 
        className="card-row"
        onClick={() => nav("/report")}
        style={{ cursor: "pointer", fontSize: "24px" }}
      >
        📊  आज की रिपोर्ट
      </div>

    </div>
  );
}
