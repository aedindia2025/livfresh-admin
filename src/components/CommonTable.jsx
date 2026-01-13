import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function CommonTable({
  columns = [],
  data = [],
  actions,
  footer,
  title,
  rowsPerPageOptions = [5, 10, 20, 50],
  defaultRowsPerPage = 10,
}) {
  const [search, setSearch] = useState("");
  const [showColumns, setShowColumns] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, col) => {
      acc[col.key] = true;
      return acc;
    }, {})
  );

  const dropdownRef = useRef(null);

  /* Close column dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowColumns(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Column toggle */
  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* Filter data */
  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* Pagination */
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  /* Copy / CSV / Excel / Print */
  const copyToClipboard = () => {
    const text = filteredData
      .map((row) =>
        columns
          .filter((c) => visibleColumns[c.key])
          .map((c) => row[c.key])
          .join("\t")
      )
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  const exportCSV = () => {
    const headers = columns
      .filter((c) => visibleColumns[c.key])
      .map((c) => c.label)
      .join(",");
    const rows = filteredData.map((row) =>
      columns
        .filter((c) => visibleColumns[c.key])
        .map((c) => row[c.key])
        .join(",")
    );
    downloadFile(
      new Blob([headers + "\n" + rows.join("\n")], { type: "text/csv" }),
      "table-data.csv"
    );
  };

  const exportExcel = () => {
    const tableHTML = document.getElementById("common-table").outerHTML;
    downloadFile(
      new Blob([tableHTML], { type: "application/vnd.ms-excel" }),
      "table-data.xls"
    );
  };

  const printTable = () => {
    const table = document.getElementById("common-table").outerHTML;
    const win = window.open("", "", "width=900,height=600");
    win.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            table { width:100%; border-collapse:collapse; }
            th, td { border:1px solid #ccc; padding:8px; }
            th { background:#f3f4f6; }
          </style>
        </head>
        <body>${table}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const downloadFile = (blob, filename) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="common-table-card">
      {/* HEADER */}
      <div className="table-header" style={{paddingBottom: "10px"}}>
        {title && <h3>{title}</h3>}

        <div className="table-toolbar">
          <div className="table-tools-left">
            <button onClick={copyToClipboard}>Copy</button>
            <button onClick={exportCSV}>CSV</button>
            <button onClick={exportExcel}>Excel</button>
            <button onClick={printTable}>Print</button>

            <div className="column-dropdown" ref={dropdownRef}>
              <button
                className="column-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColumns(!showColumns);
                }}
              >
                Column visibility ▾
              </button>
              {showColumns && (
                <div
                  className="column-menu"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "absolute",
                    background: "#fff",
                    border: "1px solid #ccc",
                    padding: "8px",
                    zIndex: 1000,
                  }}
                >
                  {columns.map((col) => (
                    <label
                      key={col.key}
                      style={{ display: "block", cursor: "pointer" }}
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns[col.key]}
                        onChange={() => toggleColumn(col.key)}
                      />{" "}
                      {col.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="table-tools-right">
            <div className="table-search">
              <FaSearch />
              <input
                type="text"
                placeholder="Search:"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <table className="common-table" id="common-table">
        <thead>
          <tr>
            {columns.map(
              (col) =>
                visibleColumns[col.key] && <th key={col.key}>{col.label}</th>
            )}
            {actions && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length === 0 && (
            <tr>
              <td colSpan="100%">No records found</td>
            </tr>
          )}

          {paginatedData.map((row, i) => (
            <tr key={i}>
              {columns.map(
                (col) =>
                  visibleColumns[col.key] && (
                    <td key={col.key}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  )
              )}

              {actions && <td>{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div
        className="table-pagination"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "12px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {/* Rows per page */}
        <div>
          Rows per page:{" "}
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
            style={{
              padding: "4px 8px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "13px",
            }}
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Page controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              background: "#ffffff",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Prev
          </button>

          {/* Show page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                background: currentPage === p ? "#29bd18" : "#ffffff",
                color: currentPage === p ? "#fff" : "#374151",
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            style={{
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              background: "#ffffff",
              cursor:
                currentPage === totalPages || totalPages === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>

      {footer && <div className="common-table-footer">{footer}</div>}
    </div>
  );
}
