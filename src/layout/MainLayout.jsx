import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import "../assets/css/dashboard.css";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="app-container">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* MOBILE OVERLAY */}
      {!collapsed && window.innerWidth < 768 && (
        <div
          className="sidebar-overlay"
          onClick={() => setCollapsed(true)}
        />
      )}

      <div className="main-wrapper">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
