import React, { useState } from 'react'
import { NavLink } from 'react-router'

function Headers({ handleLogout }) {

  const [open, setOpen] = useState(false)

  return (
    <div>

      {/* ✅ RESPONSIVE SIDEPANEL LOGIC */}
      <style>{`
        /* 🖥️ DESKTOP / LAPTOP */
        @media (min-width: 992px) {
          .app-sidepanel {
            position: static !important;
            transform: translateX(0) !important;
            width: 260px;
            height: auto;
            z-index: auto;
          }
          .sidepanel-drop {
            display: none !important;
          }
        }

        /* 📱 TABLET + MOBILE */
        @media (max-width: 991px) {
          .app-sidepanel {
            position: fixed !important;
            top: 0;
            left: 0;
            height: 100vh;
            width: 260px;
            background: #fff;
            z-index: 9999;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            pointer-events: auto;
          }

          .app-sidepanel.open {
            transform: translateX(0);
          }

          .sidepanel-drop {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.4);
            z-index: 9998;
          }
        }
      `}</style>

      <header className="app-header">
        <div className="app-header-inner">
          <div className="container py-2">
            <div className="app-header-content">
              <div className="row align-items-center header-row">

                {/* ☰ TOGGLE (mobile / tablet only) */}
                <div className="col-auto">
                  <NavLink
                    id="sidepanel-toggler"
                    className="sidepanel-toggler d-inline-block d-xl-none"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen(true)
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        strokeWidth={2}
                        d="M4 7h22M4 15h22M4 23h22"
                      />
                    </svg>
                  </NavLink>
                </div>

                <div className="search-mobile-trigger d-sm-none col">
                  <i className="search-mobile-trigger-icon fa-solid fa-magnifying-glass" />
                </div>

                <div className="app-utilities col-auto">
                  <div className="app-utility-item app-user-dropdown dropdown">
                    <NavLink className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
                      <img src="assets/images/user.png" alt="user profile" />
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* SIDEPANEL */}
        <div
          id="app-sidepanel"
          className={`app-sidepanel ${open ? "open" : ""}`}
        >
          {open && (
            <div
              id="sidepanel-drop"
              className="sidepanel-drop"
              onClick={() => setOpen(false)}
            />
          )}

          <div className="sidepanel-inner d-flex flex-column">
            <NavLink
              to="#"
              id="sidepanel-close"
              className="sidepanel-close d-xl-none"
              onClick={(e) => {
                e.preventDefault()
                setOpen(false)
              }}
            >
              ×
            </NavLink>

            <div className="app-branding">
              <NavLink
                className="app-logo"
                to="/admin"
                onClick={() => setOpen(false)}
              >
                <img className="logo-icon me-2" src="/assets/images/app-logo.svg" alt="logo" />
                <span className="logo-text">Library</span>
              </NavLink>
            </div>

            <nav className="app-nav app-nav-main flex-grow-1">
              <ul className="app-menu list-unstyled accordion">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    to="/admin"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/admin/add-book"
                    onClick={() => setOpen(false)}
                  >
                    Add Book
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/admin/view-books"
                    onClick={() => setOpen(false)}
                  >
                    View Books
                  </NavLink>
                </li>
              </ul>
            </nav>

          </div>
        </div>

      </header>
    </div>
  )
}

export default Headers
