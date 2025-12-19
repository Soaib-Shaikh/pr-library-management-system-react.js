import React, { useEffect } from 'react'
import { NavLink } from 'react-router'

function Headers({ handleLogout }) {

  useEffect(() => {
    const toggler = document.getElementById('sidepanel-toggler')
    const closer = document.getElementById('sidepanel-close')
    const drop = document.getElementById('sidepanel-drop')

    const openPanel = (e) => {
      e.preventDefault()
      document.body.classList.add('sidepanel-visible')
    }

    const closePanel = (e) => {
      e?.preventDefault()
      document.body.classList.remove('sidepanel-visible')
    }

    toggler?.addEventListener('click', openPanel)
    closer?.addEventListener('click', closePanel)
    drop?.addEventListener('click', closePanel)

    return () => {
      toggler?.removeEventListener('click', openPanel)
      closer?.removeEventListener('click', closePanel)
      drop?.removeEventListener('click', closePanel)
    }
  }, [])

  return (
    <div>
      <header className="app-header">
        <div className="app-header-inner">
          <div className="container py-2">
            <div className="app-header-content">
              <div className="row align-items-center header-row">

                {/* TOGGLE */}
                <div className="col-auto">
                  <NavLink
                    id="sidepanel-toggler"
                    className="sidepanel-toggler d-inline-block d-xl-none"
                    to="#"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth={2}
                        d="M4 7h22M4 15h22M4 23h22" />
                    </svg>
                  </NavLink>
                </div>

                {/* USER */}
                <div className="app-utilities col-auto ms-auto">
                  <div className="app-utility-item app-user-dropdown dropdown">
                    <NavLink
                      className="dropdown-toggle"
                      id="user-dropdown-toggle"
                      data-bs-toggle="dropdown"
                      to="#"
                    >
                      <img src="assets/images/user.png" alt="user profile" />
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li><NavLink className="dropdown-item" to="#">Account</NavLink></li>
                      <li><NavLink className="dropdown-item" to="#">Settings</NavLink></li>
                      <li><hr className="dropdown-divider" /></li>
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

        {/* SIDEBAR */}
        <div id="app-sidepanel" className="app-sidepanel">
          <div id="sidepanel-drop" className="sidepanel-drop" />
          <div className="sidepanel-inner d-flex flex-column">
            <NavLink to="#" id="sidepanel-close" className="sidepanel-close d-xl-none">
              ×
            </NavLink>

            <div className="app-branding">
              <NavLink className="app-logo" to="/admin">
                <span className="logo-text">Library</span>
              </NavLink>
            </div>

            <nav className="app-nav app-nav-main flex-grow-1">
              <ul className="app-menu list-unstyled">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/add-book">Add Book</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/view-books">View Books</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== CSS FOR TOGGLE ===== */}
      <style>{`
        /* Sidebar hidden by default */
        #app-sidepanel {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 260px;
          background: #fff;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: 1040;
        }

        body.sidepanel-visible #app-sidepanel {
          transform: translateX(0);
        }

        /* Overlay */
        #sidepanel-drop {
          display: none;
        }

        body.sidepanel-visible #sidepanel-drop {
          display: block;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 1030;
        }

        @media (min-width: 1200px) {
          #app-sidepanel {
            transform: translateX(0);
            position: static;
          }
          #sidepanel-drop {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Headers
