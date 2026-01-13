import { useEffect, useState } from "react";
import { FaSearch, FaUserCircle, FaArrowLeft, FaPlus } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import "./pos.css";
import { getCustomers, postCustomer, postOrderCustomer  } from "../api/commonapi";



export default function POS() {

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [qty, setQty] = useState("");
  const [amountReceived, setAmountReceived] = useState(0);
  const [paymentMode, setPaymentMode] = useState("Cash");

  // Customers
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({ name: "", phone_no: "", address: "" });
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [isAddingNewCustomer, setIsAddingNewCustomer] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  

  // Fetch items for search
  const fetchItems = async (value) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`http://192.168.0.123:8004/api/master/items/?search=${value}`);
      const data = await res.json();
      setSuggestions(data); 
    } catch (err) {
      console.error("Search error", err);
    }
  };

  // Add item to cart
  const addItem = async () => {
    if (!selectedItem || !qty) return;
    const itemQty = Number(qty);
    const price = Number(selectedItem.price);


    
    const existing = cart.find((i) => i.item_id === selectedItem.item_id);
    if (existing) {
      setCart(cart.map((i) =>
        i.item_id === selectedItem.item_id ? { ...i, qty: i.qty + itemQty } : i
      ));
    } else {
      setCart([...cart, {
        item_id: selectedItem.item_id,
        item_code: selectedItem.item_code,
        item_name: selectedItem.item_name,
        qty: itemQty,
        unit: "count",
        price,
        tax_percentage: selectedItem.tax_percentage,
      }]);
    }
    setQty("");
    setSearch("");
    setSelectedItem(null);
    setSuggestions([]);
  };

  // Totals
  const subtotal = cart.reduce((sum, i) => sum + i.qty * i.price, 0);
  const totalTax = cart.reduce((sum, i) => sum + (i.qty * i.price * i.tax_percentage) / 100, 0);
  const grandTotal = subtotal + totalTax;

  // Save & Print
 const handleSaveAndPrint = async () => {
  if (!amountReceived) {
    alert("Enter amount received");
    return;
  }

  
    const payload = {
      payment_mode: paymentMode,
      amount_received: amountReceived.toFixed(2),
      payment_reference: `${paymentMode} Payment`,
      counter: 1,
      user: 1,

 // CUSTOMER
    name: selectedCustomer?.name || "Direct",
    phone_no: selectedCustomer?.phone_no || "",
    address: selectedCustomer?.address || "",

    // ORDER INFO
    invoice_date: new Date().toISOString().split("T")[0],
    order_source: "POS",
    counter: 1,
    user: 1,

    // ORDER ITEMS
    items: cart.map((item) => ({
      item_id: item.item_id,
      qty: Number(item.qty),
      unit: item.unit,
      price: Number(item.price),
    })),


    };




    

  try {
      const res = await fetch(
        `http://192.168.0.123:8004/api/orders/orders/save-and-print/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Payment failed");

      const data = await res.json();
      console.log("Success:", data);

      window.print(); // ✅ print dialog
    } catch (err) {
      alert("Save & Print failed");
      console.error(err);
    }
  };


  // Fetch customers when modal opens
  // useEffect(() => {
  //   if (showCustomerModal) {
  //     fetch("http://192.168.0.123:8004/api/customer/customers/")
  //       .then((res) => res.json())
  //       .then((data) => setCustomers(data))
  //       .catch((err) => console.error(err));
  //   }
  // }, [showCustomerModal]);


  useEffect(() => {
  if (showCustomerModal) {
    getCustomers()
      .then((data) => setCustomers(data))
      .catch((err) => console.error(err));
  }
}, [showCustomerModal]);


  return (
    <div className="pos-wrapper">
      {/* TOP BAR */}
      <div className="top-header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="admin"><FaUserCircle size={22} /> Admin</div>
      </div>

      {/* MAIN CONTENT */}
      <div className="pos-main">
        {/* LEFT PANEL */}
        <div className="pos-left">
          <div className="pos-search">
            <button className="back-btn" onClick={() => window.history.back()}><FaArrowLeft /></button>
            <div className="search-group">
              <FaSearch className="search-icon" />
              <input
                placeholder="Search item code or name"
                value={search}
                onChange={(e) => { setSearch(e.target.value); fetchItems(e.target.value); }}
              />
              {suggestions.length > 0 && (
                <div className="search-dropdown">
                  {suggestions.map((item) => (
                    <div
                      key={item.item_id}
                      className="search-item"
                      onClick={() => { setSelectedItem(item); setSearch(`${item.item_code} - ${item.item_name}`); setSuggestions([]); }}
                    >
                      <b>{item.item_code}</b> – {item.item_name} – ₹{item.price}
                    
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="qty-group">
              <input type="number" placeholder="Qty" value={qty} onChange={(e) => setQty(e.target.value)} />
              <button disabled={!selectedItem || !qty} onClick={addItem}>Go</button>
            </div>
          </div>

          {/* ITEMS TABLE */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>ITEM CODE</th><th>ITEM NAME</th><th>QTY</th>
                  <th>UNIT</th><th>PRICE/UNIT</th><th>TAX</th><th>TOTAL(₹)</th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr><td colSpan="8" className="empty">🛒 No items added</td></tr>
                ) : (
                  cart.map((i, idx) => (
                    <tr key={i.item_id}>
                      <td>{idx + 1}</td>
                      <td>{i.item_code}</td>
                      <td>{i.item_name}</td>
                      <td>{i.qty}</td>
                      <td>{i.unit}</td>
                      <td>₹{i.price}</td>
                      <td>₹{i.tax_percentage}%</td>
                      <td>₹{(i.qty * i.price + (i.qty * i.price * i.tax_percentage) / 100).toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="pos-right">
          <div className="scroll-area">
            <div className="invoice-header">
              <div className="invoice-title">
                <h3>Invoice Summary</h3>
                {/* <span className="invoice-id">INV-001</span> */}
              </div>
            </div>

            <div className="card">
              <label className="invoice-date-wrap">Invoice Date</label>
              <input type="date" className="invoice-date" />

              {/* CUSTOMER CARD */}
              <div className="cus">
                <label className="customer-wrap">Customer</label>
                <div className="customer-header">
                  <b>{selectedCustomer?.name || "Direct"}</b>
                  <button
                    className="add-customer-btn"
                    onClick={() => { setShowCustomerModal(true); setIsAddingNewCustomer(false); }}
                  >
                    + Add / Select Customer
                  </button>
                </div>

                {/* Phone & address */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "6px" }}>
                  <input placeholder="Phone Number" value={selectedCustomer?.phone_no || ""} disabled />
                  <input placeholder="Address" value={selectedCustomer?.address || ""} disabled />
                </div>
              </div>
            </div>

            {/* PAYMENT SUMMARY */}
            <div className="card payment_card">
              <h4>Payment Summary</h4>
              <div className="row"><span>Roundoff</span><span>+ ₹0.11</span></div>
              <div className="divider"></div>
              <div className="row"><span>Sub Total</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="row total"><span>Grand Total</span><span>₹{grandTotal.toFixed(2)}</span></div>
            </div>

            {/* PAYMENT METHODS */}
            <div className="card">
              <h4>Select Payment</h4>
              <div className="payment-grid">
                <button onClick={() => setPaymentMode("Cash")}>Cash</button>
                <button onClick={() => setPaymentMode("Card")}>Card</button>
                <button onClick={() => setPaymentMode("UPI")}>UPI</button>
              </div>
            </div>

            {/* AMOUNT RECEIVED */}
            <div style={{ margin: "20px 10px" }}>
              <label>Amount Received</label>
              <input type="number" placeholder="Enter amount received" value={amountReceived} onChange={(e) => setAmountReceived(Number(e.target.value))} style={{ width: "100%", padding: "8px", margin: "5px 0px" }} />
              <p className="change">Change: <span className="change_rupee">₹{amountReceived.toFixed(2)}</span></p>
            </div>
          </div>

          {/* STICKY ACTIONS */}
          <div className="action-bar sticky">
            <button className="primary" onClick={handleSaveAndPrint}>SAVE & PRINT [CTRL+P]</button>
          </div>
        </div>
      </div>

     {/* CUSTOMER MODAL */}
{showCustomerModal && (
  <div className="modal-backdrop">
    <div className="modal">

      {/* MODAL HEADER */}
      <div className="modal-header">
        <h3>{isAddingNewCustomer ? "Add Customer" : "Select Customer"}</h3>

        <button
          className="icon-only-btn"
          onClick={() => {
            if (isAddingNewCustomer) {
              setIsAddingNewCustomer(false);
              setNewCustomer({ name: "", phone_no: "", address: "" });
            } else {
              setIsAddingNewCustomer(true);
            }
          }}
        >
          {isAddingNewCustomer ? <FaArrowLeft /> : <FaPlus />}
        </button>
      </div>

      {/* SELECT CUSTOMER */}
      {!isAddingNewCustomer && (
        <>
          <select
            value={selectedCustomer?.id || ""}
            onChange={(e) => {
              const sel = customers.find((c) => c.id === Number(e.target.value));
              setSelectedCustomer(sel || null);
            }}
          >
            <option value="">-- Select Customer --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {selectedCustomer && (
            <div className="customer-details">
              <p><b>Phone:</b> {selectedCustomer.phone_no || "-"}</p>
              <p><b>Address:</b> {selectedCustomer.address || "-"}</p>
            </div>
          )}

          <div className="modal-actions">
            <button onClick={() => setShowCustomerModal(false)}>Close</button>
          </div>
        </>
      )}

      {/* ADD CUSTOMER */}
      {isAddingNewCustomer && (
        <>
          <input
            placeholder="Customer Name *"
            value={newCustomer.name}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, name: e.target.value })
            }
          />
          <input
            placeholder="Phone Number *"
            value={newCustomer.phone_no}
            maxLength={10}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, phone_no: e.target.value })
            }
          />
          <textarea
            placeholder="Address"
            value={newCustomer.address}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, address: e.target.value })
            }
          />

          <div className="modal-actions">
            <button
              disabled={!newCustomer.name || !newCustomer.phone_no}
              // onClick={() => {
              //   const savedCustomer = { ...newCustomer, id: Date.now() };
              //   setCustomers([...customers, savedCustomer]);
              //   setSelectedCustomer(savedCustomer);
              //   setNewCustomer({ name: "", phone: "", address: "" });
              //   setIsAddingNewCustomer(false);
              //   setShowCustomerModal(false);
              // }}
               onClick={async () => {
    try {
      const payload = {
        name: newCustomer.name,
        phone_no: newCustomer.phone_no,
        address: newCustomer.address,
         order_source: "POS",
      };

      const savedCustomer = await postOrderCustomer(payload);

      // update customer list
      setCustomers((prev) => [...prev, savedCustomer]);

      // auto select newly added customer
      setSelectedCustomer(savedCustomer);

      // reset state
      setNewCustomer({ name: "", phone_no: "", address: "" });
      setIsAddingNewCustomer(false);
      setShowCustomerModal(false);
    } catch (error) {
      console.error("Failed to save customer");
    }
  }}
            >
              Save Customer
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}




      {/* STYLES */}
      <style>{`
      .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.icon-only-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  background: #ff6b35;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-only-btn:hover {
  background: #e85c2a;
}

      .customer-details {
  margin-top: 10px;
  padding: 10px;
  background: #f9f4f0;
  border-radius: 8px;
  font-size: 14px;
  color: #444;
}
.customer-details p {
  margin: 4px 0;
}
.modal select {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
.modal-actions button {
  flex: 1;
  margin-right: 8px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #ff6b35;
  color: #fff;
  cursor: pointer;
}
.modal-actions button:last-child {
  margin-right: 0;
  background: #999;
}

      .action-bar { display: flex; gap: 10px; padding: 10px 0; }
        .action-bar.sticky { position: sticky; bottom: 0; background: #f8fafc; padding-top: 12px; padding-bottom: 12px; }

      .change{ font-size:12px; color:#7a7a7a; padding-bottom:10px }
      .change_rupee{ font-size:13px; color:#ff6b35;  font-weight:600}
      .cus{ padding-top:10px;}
       .card { background: #fff; padding: 16px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); margin-bottom:10px; }
      .add-customer-btn {  background: #ff6b35;  color: #fff;  border: none;  padding: 6px 14px;  border-radius: 5px;  font-size: 12px;  font-weight: 500;  cursor: pointer;  transition: all 0.2s ease;}
        .add-customer-btn:hover {  background: #e85c2a;}

       .customer-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
      .customer-wrap{font-weight: 600; color:#646464;}
      .cus{ padding-top:10px;}
        * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        .pos-wrapper { height: 100vh; background: #f9f4f0; display: flex; flex-direction: column; }
        .top-header { height: 60px; background: #fff; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .logo { height: 36px; }
        .admin { display: flex; gap: 6px; align-items: center; color: #1e293b; font-weight: 500; }
        .pos-main { flex: 1; display: flex; gap: 16px; padding: 16px; overflow: hidden; }
        .pos-left { flex: 3; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; }
        .pos-right { width: 380px; display: flex; flex-direction: column; gap: 16px; }
        .scroll-area { overflow-y: auto; flex: 1; padding-right: 4px; background-color:#fff; border-radius: 10px; padding: 16px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);}
        .pos-search { display: flex; gap: 10px;  border-radius: 10px; align-items: center; }
        .back-btn { border: none; background: #fff; padding: 20px; border-radius: 10px; cursor: pointer; }
        .back-btn:hover{background: #ff6b35; color:#fff;}
        .search-group:hover{border: 1px solid #ff6b35;}
        .search-group { flex: 1; display: flex; align-items: center; gap: 8px; background: #fff; padding: 18px; border-radius: 10px; border: 1px solid #e5e7eb; }
        .search-group input { border: none; outline: none; width: 100%;    FONT-SIZE: large; }
        .qty-group { display: flex; gap: 8px; }
        .qty-group input { width: 150px; padding:24px; border-radius: 8px; font-size: large; }
        .qty-group input:hover{border: 1px solid #ff6b35;}
        .qty-group button { background: #ff6b35; color: #fff; border-radius: 10px; padding: 18px; border: none; cursor: pointer; transition: 0.2s;    font-size: large; }
        .qty-group button:hover { background: #ff6b35; }
        .qty-group button:active { background: #ff6b35; }
        .table-wrapper { overflow-y: auto; max-height: 500px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        table { width: 100%; border-collapse: collapse; background: #fff; }
        thead th { position: sticky; top: 0; background: #ff6b35; color: #fff; padding: 12px; text-align: left; z-index: 1; }
        td { padding: 12px; border-bottom: 1px solid #f1f5f9; }
        tbody tr:hover { background: #f8fafc; }
        .empty { text-align: center; padding: 60px; color: #64748b; }

        .card { background: #fff; padding: 16px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); margin-bottom:10px; }
        .payment_card{background: #f9f4f0; border: 1px solid #ffd6c7;margin-bottom:10px; }
        
        .customer-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .invoice-header { display: flex; justify-content: space-between; margin-bottom: 8px;  padding-bottom:10px;  border-bottom: 1px solid #e5e5e5; }
        .invoice-id { font-size: 12px; color: #ff6b35; }
        .row { display: flex; justify-content: space-between; margin: 14px 0; }
        .total { font-weight: 700; font-size: 18px; }
        .action-bar { display: flex; gap: 10px; padding: 10px 0; }
        .action-bar.sticky { position: sticky; bottom: 0; background: #f8fafc; padding-top: 12px; padding-bottom: 12px; }

        .outline { flex: 1; border: 1px solid #ff6b35; background: transparent; padding: 12px; border-radius: 12px; cursor: pointer; }
        .primary { flex: 1; background: #ff6b35; color: #fff; border: none; padding: 12px; border-radius: 12px; cursor: pointer; }

        .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.4); display: flex; align-items: center; justify-content: center; z-index: 999; }
        .modal { background: #fff; padding: 28px; border-radius: 20px; width: 520px; max-width: 90vw;   min-height: 320px; }
        .modal input, .modal textarea { width: 100%; padding: 14px; margin-top: 10px; border-radius: 8px; border: 1px solid #e5e7eb; }
        .modal-actions { display: flex; gap: 10px; margin-top: 14px; }
        .modal-actions button { flex: 1; padding: 10px; border-radius: 12px; border: none; background: #ff6b35; color: #fff; cursor: pointer; }

        .order-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .items-count {padding: 4px 8px; border-radius: 8px; font-size: 12px; }
        .clear-btn { border: none; background: #fee2e2; color: #ef4444; padding: 6px 10px; border-radius: 8px; cursor: pointer; }

        .order-item { display: flex; justify-content: space-between; align-items: center; margin: 10px 0; }
        .qty-control { display: flex; gap: 6px; align-items: center; }
        .qty-control button { border: none; background: #e5e7eb; padding: 4px 8px; border-radius: 6px; cursor: pointer; }
        .item-name { flex: 1; font-size: 14px; }
        .item-price { font-weight: 500; }

        .discount-card { display: flex; justify-content: space-between; align-items: center; ; border: 1px solid #ff6b35; padding: 12px; border-radius: 10px; margin-bottom:10px }
        .discount-left { display: flex; gap: 10px; align-items: center; }
        .discount-icon { width: 36px; height: 36px; background: #ff6b35; color: #fff; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .apply-btn { background: #ff6b35; color: #fff; border: none; padding: 6px 12px; border-radius: 999px; cursor: pointer; }

        .empty-small { text-align: center; color: #94a3b8; font-size: 13px; }
        .payment-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .payment-grid button { padding: 12px 0; border-radius: 12px; background: #f1f5f9; border: none; font-size: 14px; cursor: pointer; transition: 0.2s; }
        .payment-grid button:hover { background: #ff6b35; color: #fff; }
        .invoice-date {  padding: 8px 12px;  border-radius: 10px;  border: 1px solid #e5e7eb;  background: #f8fafc;  font-size: 13px;  cursor: pointer;     width: 100%;}
        .add-customer-btn {  background: #ff6b35;  color: #fff;  border: none;  padding: 6px 14px;  border-radius: 5px;  font-size: 12px;  font-weight: 500;  cursor: pointer;  transition: all 0.2s ease;}
        .add-customer-btn:hover {  background: #e85c2a;}
        .invoice-header {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .invoice-title h3 {
            margin: 0;
          }

          .invoice-date-wrap {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .invoice-date-wrap label { font-weight: 600;  color:#646464;    }
          .customer-wrap{font-weight: 600; color:#646464;}


      `}</style>
    </div>
    
  );
}