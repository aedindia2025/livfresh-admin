import CommonTable from "../components/CommonTable";
import "../assets/css/style.css";

export default function PurchaseReport() {
  const columns = [
    { key: "supplier", label: "Supplier" },
    { key: "date", label: "Date and Time" },
    { key: "products", label: "Products" },
    { key: "total", label: "Total" },
    { key: "qty", label: "Total Items Quantity" },
  ];

  const data = [
    {
      supplier: "Coastal Fish Traders",
      date: "12-12-2025 07:12",
      products: "Yellowfin Tuna - 142.70, Live Mrigal - 149.95, Seer Fish - 124.60",
      total: "₹12,845.60",
      qty: "89",
    },
    {
      supplier: "Coastal Fish Traders",
      date: "15-12-2025 07:12",
      products: "Live Rohu - 152.15, Mrigal - 147.65, Dry Anchovy (Large) - 104.70",
      total: "₹10,441.70",
      qty: "80",
    },
    {
      supplier: "Coastal Fish Traders",
      date: "24-12-2025 07:12",
      products: "Mackerel - 139.55, Dry Fish Powder - 83.20, Live Tilapia - 166.20",
      total: "₹9,979.60",
      qty: "80",
    },
  ];

  return (
    <div className="page-container">

      {/* REPORT FILTERS */}
      <div className="report-grid">
        <div className="card">
          <h4>Annual Report</h4>
          <input type="year" className="input" />
          <div className="actions report-generate">
            <p>Generate Reports</p>
            <button className="btn-orange">PDF</button>
            <button className="btn-orange-outline">Excel</button>
          </div>
        </div>

        <div className="card">
          <h4>Monthly Report</h4>
          <input type="month" className="input" />
          <div className="actions report-generate">
            <p>Generate Reports</p>
            <button className="btn-orange">PDF</button>
            <button className="btn-orange-outline">Excel</button>
          </div>
        </div>

        <div className="card">
          <h4>Daily Report</h4>
          <input type="date" className="input" />
          <div className="actions report-generate">
            <p>Generate Reports</p>
            <button className="btn-orange">PDF</button>
            <button className="btn-orange-outline">Excel</button>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="summary-card">
        <div className="report-generate">
          <h3>General Summary</h3>
          <p><strong>Total Suppliers:</strong> 4</p>
          <p><strong>Total Items Purchased:</strong> 3042</p>
          <p><strong>Total Purchases:</strong> ₹32,267.00</p>
        </div>
        <div className="actions report-generate">
          <p>Generate Reports</p>
          <button className="btn-orange">PDF</button>
          <button className="btn-orange-outline">Excel</button>
        </div>
      </div>

      {/* TABLE */}
      <CommonTable columns={columns} data={data} />
    </div>
  );
}
