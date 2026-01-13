import "./Sidebar.css";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCashRegister,
  FaChartLine,
  FaListAlt,
  FaBoxOpen,
  FaTruck,
  FaShoppingCart,
  FaEllipsisH,
  FaFileInvoiceDollar,
  FaReceipt,
  FaMoneyCheckAlt,
} from "react-icons/fa";

export default function Sidebar({ collapsed, setCollapsed, activeMenu, setActiveMenu }) {
  const navigate = useNavigate();

  const handleClick = (menu, path) => {
    setActiveMenu(menu);
    navigate(path);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {!collapsed && <div className="sidebar-overlay" onClick={() => setCollapsed(true)} />}

      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        {/* LOGO */}
        <div className="sidebar-header">
          <img src={logo} alt="Logo" />
        </div>

        {/* MENU */}
        <ul className="menu">
          <li className={`menu-item ${activeMenu === "dashboard" ? "active" : ""}`}
              onClick={() => handleClick("dashboard", "/")}>
            <FaHome className="icon" />
            {!collapsed && <span>Home</span>}
          </li>

          <li className={`menu-item ${activeMenu === "pos" ? "active" : ""}`}
              onClick={() => handleClick("pos", "/pos")}>
            <FaCashRegister className="icon" />
            {!collapsed && <span>POS</span>}
          </li>

          <li className={`menu-item ${activeMenu === "sales" ? "active" : ""}`}
              onClick={() => handleClick("sales", "/sales")}>
            <FaChartLine className="icon" />
            {!collapsed && <span>Sales</span>}
          </li>

          <li className={`menu-item ${activeMenu === "category" ? "active" : ""}`}
              onClick={() => handleClick("category", "/category")}>
            <FaListAlt className="icon" />
            {!collapsed && <span>Category</span>}
          </li>

          <li className={`menu-item ${activeMenu === "products" ? "active" : ""}`}
              onClick={() => handleClick("products", "/products")}>
            <FaBoxOpen className="icon" />
            {!collapsed && <span>Products</span>}
          </li>

          <li className={`menu-item ${activeMenu === "suppliers" ? "active" : ""}`}
              onClick={() => handleClick("suppliers", "/suppliers")}>
            <FaTruck className="icon" />
            {!collapsed && <span>Suppliers</span>}
          </li>
          <li className={`menu-item ${activeMenu === "customer" ? "active" : ""}`}
              onClick={() => handleClick("customer", "/customer")}>
            <FaMoneyCheckAlt className="icon" />
            {!collapsed && <span>Customer</span>}
          </li>
          <li className={`menu-item ${activeMenu === "purchased" ? "active" : ""}`}
              onClick={() => handleClick("purchased", "/purchased")}>
            <FaShoppingCart className="icon" />
            {!collapsed && <span>Purchased</span>}
          </li>

          <li className={`menu-item ${activeMenu === "misc" ? "active" : ""}`}
              onClick={() => handleClick("misc", "/misc")}>
            <FaEllipsisH className="icon" />
            {!collapsed && <span>Misc</span>}
          </li>

          <li className={`menu-item ${activeMenu === "salesreport" ? "active" : ""}`}
              onClick={() => handleClick("salesreport", "/salesreport")}>
            <FaFileInvoiceDollar className="icon" />
            {!collapsed && <span>Sales Report</span>}
          </li>

          <li className={`menu-item ${activeMenu === "purchasereport" ? "active" : ""}`}
              onClick={() => handleClick("purchasereport", "/purchasereport")}>
            <FaReceipt className="icon" />
            {!collapsed && <span>Purchase Report</span>}
          </li>

          <li className={`menu-item ${activeMenu === "profitreport" ? "active" : ""}`}
              onClick={() => handleClick("profitreport", "/profitreport")}>
            <FaMoneyCheckAlt className="icon" />
            {!collapsed && <span>Profit Report</span>}
          </li>
          <li className={`menu-item ${activeMenu === "orderreport" ? "active" : ""}`}
              onClick={() => handleClick("orderreport", "/orderreport")}>
            <FaMoneyCheckAlt className="icon" />
            {!collapsed && <span>Counter Report</span>}
          </li>
        </ul>
      </aside>
    </>
  );
}
