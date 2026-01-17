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

          {/* ================= POS RECEIPT (SALES STYLE) ================= */}
          <div className="receipt-paper" id="print-receipt">
            <div className="center">
              <h4>LIVE FISH STORE</h4>
              <p>123 Business Street, City - 600001</p>
              <p> <b>Ph: +91 98765 43210 | GSTIN: GST123456789 </b></p>
            </div>

            <hr />

            <div className="row">
              <span>Invoice</span>
              <span>POS-{Date.now()}</span>
            </div>
            <div className="row">
              <span>Date</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
            <div className="row">
              <span>Customer</span>
              <span>{selectedCustomer?.name || "Direct"}</span>
            </div>

            <hr />

            <p className="section-title">ITEMS</p>

            {cart.map((item, idx) => (
              <div key={idx}>
                <div className="row bold">
                  <span>{item.item_name}</span>
                  <span>
                    ₹{(
                      item.qty * item.price +
                      (item.qty * item.price * item.tax_percentage) / 100
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="row small">
                  <span>
                    {item.qty} × ₹{item.price}
                  </span>
                </div>
              </div>
            ))}

            <hr />

            <div className="row">
              <span>Sub Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="row">
              <span>Tax</span>
              <span>₹{totalTax.toFixed(2)}</span>
            </div>

            <div className="row bold">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>

            <hr />

            <div className="row">
              <span>Payment Mode</span>
              <span>{paymentMode}</span>
            </div>

            <div className="row">
              <span>Amount Received</span>
              <span>₹{amountReceived.toFixed(2)}</span>
            </div>

            <div className="row">
              <span>Balance</span>
              <span>₹{(amountReceived - grandTotal).toFixed(2)}</span>
            </div>

            <hr />

            <p className="center small receipt-footer">
              Thank you! Visit again.
              <br />
            <span>No returns or exchanges. Prices include all taxes.</span> 
            </p>
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
     

      `}</style>
    </div>
    
  );
}