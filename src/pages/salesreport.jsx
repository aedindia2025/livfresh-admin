import CommonTable from "../components/CommonTable";
import "../assets/css/style.css";

export default function SalesReport() {
  const columns = [
    { key: "customer", label: "Customer" },
    { key: "date", label: "Date and Time" },
    { key: "products", label: "Products" },
    { key: "total", label: "Total" },
    { key: "qty", label: "Total Items Quantity" },
  ];

  const data = [
    {
      customer: "Walk-in Customer 1",
      date: "07-01-2026 07:15",
      products: "Pomfret (White) - 2kg, Prawns (Large) - 1kg, Fish Fry Mix - 2kg",
      total: "₹1,515.15",
      qty: "5",
    },
    {
      customer: "Walk-in Customer 2",
      date: "06-01-2026 07:15",
      products: "Chilled Seer Fish - 2kg, Dry Prawns (Medium) - 3kg",
      total: "₹1,202.25",
      qty: "6",
    },
    {
      customer: "Walk-in Customer 3",
      date: "05-01-2026 07:15",
      products: "Live Catla - 1kg, Grouper - 2kg",
      total: "₹1,163.40",
      qty: "5",
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
        <div className=" report-generate">
            <h3>General Summary</h3>
          <p><strong>Total Customers:</strong> 5</p>
          <p><strong>Total Items Sold:</strong> 30</p>
          <p><strong>Total Sales:</strong> ₹7,098.00</p>
        </div>
        <div class="actions report-generate">
           <p>Generate Reports</p>
          <button className="btn-orange" >PDF</button>
          <button className="btn-orange-outline">Excel</button>
        </div>
      </div>

      {/* TABLE */}
      <CommonTable columns={columns} data={data} />
    </div>
  );
}
