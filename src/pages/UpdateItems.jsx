import { useEffect, useState } from "react";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { toHindi } from "../utils/hindiConvert";

export default function UpdateItems() {
  const [items, setItems] = useState([]);

  const [showRateModal, setShowRateModal] = useState(false);
  const [showQtyModal, setShowQtyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [newRate, setNewRate] = useState("");
  const [addQty, setAddQty] = useState("");

  const [newName, setNewName] = useState("");
  const [newItemRate, setNewItemRate] = useState("");
  const [newItemStock, setNewItemStock] = useState("");

  const nav = useNavigate();

  // LOAD ITEMS
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    API.get("/items/all").then(res => {
      setItems(res.data);
    });
  };

  // OPEN RATE MODAL
  const openRateModal = (item) => {
    setSelectedItem(item);
    setNewRate(item.defaultRate);
    setShowRateModal(true);
  };

  // SAVE RATE
  const saveRate = async () => {
    await API.put(`/items/update/${selectedItem._id}`, {
      defaultRate: Number(newRate)
    });
    loadItems();
    setShowRateModal(false);
  };

  // OPEN QTY MODAL
  const openQtyModal = (item) => {
    setSelectedItem(item);
    setAddQty("");
    setShowQtyModal(true);
  };

  // SAVE ADDED STOCK
  const saveQty = async () => {
    const updatedStock = Number(selectedItem.stock) + Number(addQty);

    await API.put(`/items/update/${selectedItem._id}`, {
      stock: updatedStock
    });

    loadItems();
    setShowQtyModal(false);
  };

  // OPEN DELETE CONFIRM
  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  // DELETE ITEM
  const deleteItem = async () => {
    await API.delete(`/items/delete/${selectedItem._id}`);
    loadItems();
    setShowDeleteModal(false);
  };

  // ADD NEW ITEM
  const saveNewItem = async () => {
    const hindiName = await toHindi(newName);
    await API.post("/items/new", {
      name: hindiName,
      defaultRate: Number(newItemRate),
      stock: Number(newItemStock)
    });
    loadItems();
    setShowNewItemModal(false);

    setNewName("");
    setNewItemRate("");
    setNewItemStock("");
  };

  return (
    <div className="page">

      <div className="back-btn" onClick={() => nav(-1)}>← वापस जाएँ</div>

      <h2 className="title">आइटम अपडेट करें</h2>

      {/* ADD NEW ITEM BUTTON */}
      <button
        className="btn"
        style={{ marginBottom: "20px" }}
        onClick={() => setShowNewItemModal(true)}
      >
        ➕ नया आइटम जोड़ें
      </button>

      {/* ITEMS LIST */}
      {items.map(item => (
        <div className="card-row" key={item._id}>

          <div style={{ fontSize: "22px", marginBottom: "12px" }}>
            <span className="item-icon">📦</span> {item.name}
          </div>

          <div className="card-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            {/* Rate */}
            <button
              className="modal-btn"
              style={{ background: "#eef3ff", fontSize: "18px" }}
              onClick={() => openRateModal(item)}
            >
              रेट: ₹{item.defaultRate}
            </button>

            {/* Add Stock */}
            <button
              className="modal-btn"
              style={{ background: "#eef7ff", fontSize: "18px" }}
              onClick={() => openQtyModal(item)}
            >
              मात्रा बढ़ाएँ
            </button>

            {/* Delete */}
            <button
              className="modal-btn"
              style={{ background: "#ffe2e2", color: "#b30000", fontSize: "18px" }}
              onClick={() => openDeleteModal(item)}
            >
              ❌ हटाएँ
            </button>
          </div>

        </div>
      ))}

      {/* MODAL — UPDATE RATE */}
      {showRateModal && (
        <Modal
          title="रेट अपडेट करें"
          onCancel={() => setShowRateModal(false)}
          onSave={saveRate}
        >
          <input
            className="input-box"
            type="number"
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
          />
        </Modal>
      )}

      {/* MODAL — ADD QTY */}
      {showQtyModal && (
        <Modal
          title="मात्रा बढ़ाएँ"
          onCancel={() => setShowQtyModal(false)}
          onSave={saveQty}
        >
          <input
            className="input-box"
            type="number"
            placeholder="कितनी मात्रा जोड़ें?"
            value={addQty}
            onChange={(e) => setAddQty(e.target.value)}
          />
        </Modal>
      )}

      {/* MODAL — DELETE ITEM */}
      {showDeleteModal && (
        <Modal
          title="क्या आप आइटम हटाना चाहते हैं?"
          onCancel={() => setShowDeleteModal(false)}
          onSave={deleteItem}
        >
          <div style={{ fontSize: "20px", textAlign: "center" }}>
            {selectedItem?.name}
          </div>
        </Modal>
      )}

      {/* MODAL — ADD NEW ITEM */}
      {showNewItemModal && (
        <Modal
          title="नया आइटम जोड़ें"
          onCancel={() => setShowNewItemModal(false)}
          onSave={saveNewItem}
        >

          <input
            className="input-box"
            placeholder="नाम"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <input
            className="input-box"
            placeholder="रेट"
            type="number"
            style={{ marginTop: "14px" }}
            value={newItemRate}
            onChange={(e) => setNewItemRate(e.target.value)}
          />

          <input
            className="input-box"
            placeholder="स्टॉक"
            type="number"
            style={{ marginTop: "14px" }}
            value={newItemStock}
            onChange={(e) => setNewItemStock(e.target.value)}
          />

        </Modal>
      )}

    </div>
  );
}
