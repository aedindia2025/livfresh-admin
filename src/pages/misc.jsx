import { FaFilePdf, FaFileExcel } from "react-icons/fa";

export default function Miscellaneous() {
  return (
    <div className="page-wrapper">
      <h2 className="page-title">Miscellaneous</h2>

      {/* Supplier & Product Lists */}
      <div className="grid-2">
        {/* Supplier List */}
        <div className="card">
          <h3 className="card-title">Supplier Reports</h3>

          <div className="card-section">
            <span className="section-title">Flat Supplier List</span>
            <div className="btn-group">
              <button className="btn btn-orange">
                <FaFilePdf /> PDF
              </button>
              <button className="btn btn-outline">
                <FaFileExcel /> Excel
              </button>
            </div>
          </div>

          <div className="card-section">
            <span className="section-title">Suppliers & Products</span>
            <div className="btn-group">
              <button className="btn btn-orange">
                <FaFilePdf /> PDF
              </button>
              <button className="btn btn-outline">
                <FaFileExcel /> Excel
              </button>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="card">
          <h3 className="card-title">Product Reports</h3>

          <div className="card-section">
            <span className="section-title">Flat Product List</span>
            <div className="btn-group">
              <button className="btn btn-orange">
                <FaFilePdf /> PDF
              </button>
              <button className="btn btn-outline">
                <FaFileExcel /> Excel
              </button>
            </div>
          </div>

          <div className="card-section">
            <span className="section-title">Product & Quantity</span>
            <div className="btn-group">
              <button className="btn btn-orange">
                <FaFilePdf /> PDF
              </button>
              <button className="btn btn-outline">
                <FaFileExcel /> Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cash Register */}
      <div className="padding_ten">
        <h3 className="card-title">Cash Register Closing</h3>
        <p className="muted-text">
          Generate end-of-day cash closing reports.
        </p>
      </div>

      {/* Reports */}
      <div className="grid-2">
        {/* Daily Report */}
        <div className="card">
          <h3 className="card-title">Daily Report</h3>

          <input type="date" className="input" />
          <select className="input">
            <option>Select Month</option>
          </select>

          <div className="btn-group space-top">
            <button className="btn btn-orange">
              <FaFilePdf /> Generate PDF
            </button>
            <button className="btn btn-outline">
              <FaFileExcel /> Generate Excel
            </button>
          </div>
        </div>

        {/* Date Range Report */}
        <div className="card">
          <h3 className="card-title">Report Between Dates</h3>

          <div className="grid-2">
            <input type="date" className="input" />
            <input type="date" className="input" />
          </div>

          <select className="input">
            <option>Select Month</option>
          </select>

          <div className="btn-group space-top">
            <button className="btn btn-orange">
              <FaFilePdf /> Generate PDF
            </button>
            <button className="btn btn-outline">
              <FaFileExcel /> Generate Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
