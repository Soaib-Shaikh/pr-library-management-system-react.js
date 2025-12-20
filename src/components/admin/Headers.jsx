import React, { useState } from 'react'
import { NavLink } from 'react-router'

function Headers({ handleLogout }) {

  const [open, setOpen] = useState(false)

  return (
    <div>

      {/* ✅ CSS INSIDE COMPONENT */}
      <style>{`
        .app-sidepanel {
          transform: translateX(-100%);
          transition: 0.3s ease;
        }

        .app-sidepanel.sidepanel-visible {
          transform: translateX(0);
        }
      `}</style>

      <header className="app-header">
        <div className="app-header-inner">
          <div className="container py-2">
            <div className="app-header-content">
              <div className="row align-items-center header-row">

                {/* ☰ TOGGLE BUTTON */}
                <div className="col-auto">
                  <button
                    className="sidepanel-toggler d-inline-block d-xl-none"
                    onClick={() => setOpen(true)}
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
                  </button>
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

        {/* ✅ SIDE PANEL */}
        <div
          id="app-sidepanel"
          className={`app-sidepanel ${open ? "sidepanel-visible" : ""}`}
        >
          <div
            id="sidepanel-drop"
            className="sidepanel-drop"
            onClick={() => setOpen(false)}
          />

          <div className="sidepanel-inner d-flex flex-column">
            <button
              className="sidepanel-close d-xl-none"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

            <div className="app-branding">
              <NavLink className="app-logo" to="/admin" onClick={() => setOpen(false)}>
                <img
                  className="logo-icon me-2"
                  src="/assets/images/app-logo.svg"
                  alt="logo"
                />
                <span className="logo-text">Library</span>
              </NavLink>
            </div>

            <nav className="app-nav app-nav-main flex-grow-1">
              <ul className="app-menu list-unstyled">

                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin" onClick={() => setOpen(false)}>
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/add-book" onClick={() => setOpen(false)}>
                    Add Book
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/view-books" onClick={() => setOpen(false)}>
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
