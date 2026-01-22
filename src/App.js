import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import UpdateItems from "./pages/UpdateItems";
import BillHistory from "./pages/BillHistory";
import BillPreview from "./pages/BillPreview";
import BillDetails from "./pages/BillDetails";
import Report from "./pages/Report";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/update-items" element={<UpdateItems />} />
        <Route path="/history" element={<BillHistory />} />
        <Route path="/bill-preview" element={<BillPreview />} />
        <Route path="/bill/:id" element={<BillDetails />} />
        <Route path="/report" element={<Report />} />


      </Routes>
    </Router>
  );
}

export default App;
