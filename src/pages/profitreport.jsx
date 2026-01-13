import { useEffect, useState } from "react";
import CommonTable from "../components/CommonTable";
import "../assets/css/style.css";
import { getProfitReport } from "../api/commonapi"; // Your API call

export default function ProfitReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalCustomers: 0,
    totalItems: 0,
    totalSales: 0,
    totalCost: 0,
    totalProfit: 0,
  });

  const [filters, setFilters] = useState({
    year: "",
    month: "",
    date: "",
  });

  const columns = [
    { key: "date", label: "Date" },
    { key: "invoice", label: "Invoice #" },
    { key: "customer", label: "Customer" },
    { key: "totalSale", label: "Total Sale" },
    { key: "totalCost", label: "Total Cost" },
    { key: "profit", label: "Profit" },
    { key: "qty", label: "Total Items" },
  ];

  // Fetch data from API
  const fetchData = async (filterType = "", filterValue = "") => {
    setLoading(true);
    try {
      const response = await getProfitReport({ type: filterType, value: filterValue });
      setData(response.data);

      // Calculate summary dynamically
      const totalSales = response.data.reduce((acc, item) => acc + Number(item.totalSale), 0);
      const totalCost = response.data.reduce((acc, item) => acc + Number(item.totalCost), 0);
      const totalProfit = totalSales - totalCost;
      const totalItems = response.data.reduce((acc, item) => acc + Number(item.qty), 0);
      const totalCustomers = new Set(response.data.map((item) => item.customer)).size;

      setSummary({
        totalCustomers,
        totalItems,
        totalSales,
        totalCost,
        totalProfit,
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Handle filter change
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    fetchData(type, value);
  };

  return (
    <div className="page-container">

      {/* REPORT FILTERS */}
      <div className="report-grid">
        <div className="card">
          <h4>Annual Report</h4>
          <input
            type="year"
            className="input"
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
          />
          <div className="actions report-generate">
            <p>Generate Reports</p>
            <button className="btn-orange">PDF</button>
            <button className="btn-orange-outline">Excel</button>
          </div>
        </div>

        <div className="card">
          <h4>Monthly Report</h4>
          <input
            type="month"
            className="input"
            value={filters.month}
            onChange={(e) => handleFilterChange("month", e.target.value)}
          />
          <div className="actions report-generate">
            <p>Generate Reports</p>
            <button className="btn-orange">PDF</button>
            <button className="btn-orange-outline">Excel</button>
          </div>
        </div>

        <div className="card">
          <h4>Daily Report</h4>
          <input
            type="date"
            className="input"
            value={filters.date}
            onChange={(e) => handleFilterChange("date", e.target.value)}
          />
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
          <p><strong>Total Customers:</strong> {summary.totalCustomers}</p>
          <p><strong>Total Items Sold:</strong> {summary.totalItems}</p>
          <p><strong>Total Sales:</strong> ₹{summary.totalSales.toFixed(2)}</p>
          <p><strong>Total Cost:</strong> ₹{summary.totalCost.toFixed(2)}</p>
          <p><strong>Total Profit:</strong> ₹{summary.totalProfit.toFixed(2)}</p>
        </div>
        <div className="actions report-generate">
          <p>Generate Reports</p>
          <button className="btn-orange">PDF</button>
          <button className="btn-orange-outline">Excel</button>
        </div>
      </div>

      {/* TABLE */}
      <CommonTable columns={columns} data={data} loading={loading} />
    </div>
  );
}
