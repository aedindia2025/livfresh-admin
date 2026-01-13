import { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaBell,
  FaExpand,
  FaCompress,
  FaUserCircle,
  FaStore,
} from "react-icons/fa";

export default function Navbar({ collapsed, setCollapsed }) {
  const [time, setTime] = useState(new Date());
  const [fullscreen, setFullscreen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const userRef = useRef(null);

  /* ===== LIVE TIME ===== */
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ===== CLOSE DROPDOWN ON OUTSIDE CLICK ===== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===== FULLSCREEN ===== */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <header className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        {/* 🔹 TOGGLE (ALWAYS VISIBLE) */}
        <span
          className="nav-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </span>

        {/* Outlet / Counter */}
        <div className="nav-outlet">
          <FaStore />
          <span>
            <strong> Liv Fresh Store</strong> / Counter <strong>C1</strong>
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        {/* Time */}
        <span className="nav-time">
          {time.toLocaleDateString()} | {time.toLocaleTimeString()}
        </span>

        {/* Notifications */}
        <span className="nav-icon">
          <FaBell />
          <span className="badge">2</span>
        </span>

        {/* Fullscreen */}
        <span className="nav-icon" onClick={toggleFullscreen}>
          {fullscreen ? <FaCompress /> : <FaExpand />}
        </span>

        {/* User */}
        <span
          className="user-menu"
          ref={userRef}
          onClick={() => setUserMenu(!userMenu)}
        >
          <FaUserCircle />
          <span className="user-name">Admin</span>

          {userMenu && (
            <div className="user-dropdown">
              <span>My Profile</span>
              <span>Switch Counter</span>
              <span>Change Password</span>
              <span className="logout">Logout</span>
            </div>
          )}
        </span>
      </div>
    </header>
  );
}
