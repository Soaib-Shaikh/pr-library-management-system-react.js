import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Header({ handleLogout }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="topbar">
                <button className="menu-btn d-xl-none" onClick={() => setOpen(true)}>
                    ☰
                </button>

                <h5 className="title">Library Admin</h5>

                <div className="top-right">
                    <img
                        src="/assets/images/user.png"
                        alt="user"
                        className="user-img"
                    />
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </header>

            {/* OVERLAY */}
            {open && <div className="overlay" onClick={() => setOpen(false)} />}

            {/* SIDEBAR */}
            <aside className={`sidebar ${open ? "open" : ""}`}>
                <div className="logo">📚 Library</div>

                <NavLink to="/admin" onClick={() => setOpen(false)}>
                    Dashboard
                </NavLink>

                <NavLink to="/admin/add-book" onClick={() => setOpen(false)}>
                    Add Book
                </NavLink>

                <NavLink to="/admin/view-books" onClick={() => setOpen(false)}>
                    View Books
                </NavLink>
            </aside>

        <style>{`
       
        .topbar {
          height: 60px;
          background: #fff;
          display: flex;
          align-items: center;
          padding: 0 15px;
          border-bottom: 1px solid #ddd;
          position: sticky;
          top: 0;
          z-index: 1200;
        }

        .menu-btn {
          font-size: 22px;
          background: none;
          border: none;
          margin-right: 15px;
          cursor: pointer;
        }

        .title {
          margin: 0;
          font-weight: 600;
        }

        .top-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }

        .logout-btn {
          border: none;
          background: #ef4444;
          color: #fff;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
        }

        /* SIDEBAR */
        .sidebar {
          width: 240px;
          height: 100vh;
          background: #0f172a;
          color: #fff;
          position: fixed;
          top: 0;
          left: -240px;
          transition: 0.3s;
          z-index: 1300;
          padding: 20px;
        }

        .sidebar.open {
          left: 0;
        }

        .logo {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .sidebar a {
          display: block;
          color: #cbd5f5;
          text-decoration: none;
          padding: 10px 0;
          font-size: 15px;
        }

        .sidebar a.active {
          color: #22c55e;
          font-weight: 600;
        }

        /* OVERLAY */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 1250;
        }

        /* DESKTOP */
        @media (min-width: 1200px) {
          .sidebar {
            left: 0;
          }

          .menu-btn {
            display: none;
          }

          .overlay {
            display: none;
          }
        }
        .app-content,
        .main-content,
        .page-content,
        .content,
        .container-fluid {
        transition: 0.3s;
        }

        @media (min-width: 1200px) {
        .app-content,
        .main-content,
        .page-content {
            margin-left: 240px;
        }
        }

        @media (max-width: 1199px) {
        .app-content,
        .main-content,
        .page-content,
        .content,
        .container-fluid {
            margin-left: 0 !important;
            padding-left: 12px;
            padding-right: 12px;
        }

        body {
            overflow-x: hidden;
        }
        }

      `}</style>
        </>
    );
}

export default Header;
