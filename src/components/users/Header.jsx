import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"))
    setUser(loggedUser)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setOpen(false)
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <>
      <header className="user-header">
        <div className="container">
          <div className="row align-items-center py-3">

            {/* LOGO */}
            <div className="col-md-4 col-6">
              <NavLink to="/" className="logo">
                📚 Library
              </NavLink>
            </div>

            {/* TOGGLE BUTTON (SM + MD) */}
            <div className="col-6 d-md-block d-lg-none text-end">
              <button
                className="profile-btn"
                onClick={() => setMenuOpen(prev => !prev)}
              >
                ☰
              </button>
            </div>

            {/* NAV + AUTH (DESKTOP) */}
            <div className="col-md-8 d-none d-lg-flex justify-content-end align-items-center">
              <nav className="user-nav">
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/books" className="nav-link">Books</NavLink>
                <NavLink to="/about" className="nav-link">About</NavLink>
                <NavLink to="/contact" className="nav-link">Contact</NavLink>
              </nav>

              <div className="user-auth">
                {user ? (
                  <div className="dropdown">
                    <button
                      type="button"
                      className="profile-btn"
                      onClick={() => setOpen(prev => !prev)}
                    >
                      👤 {user.username || user.name}
                    </button>

                    {open && (
                      <div className="dropdown-menu" style={{ display: 'block' }}>
                        <NavLink to="/profile" onClick={() => setOpen(false)}>
                          My Profile
                        </NavLink>
                        <NavLink to="/my-books" onClick={() => setOpen(false)}>
                          My Books
                        </NavLink>
                        <button onClick={handleLogout}>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink to="/login" className="signin-btn">
                    Sign In
                  </NavLink>
                )}
              </div>
            </div>
          </div>

          {/* MOBILE + TABLET MENU */}
          {menuOpen && (
            <div className="mobile-menu d-lg-none">
              <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
              <NavLink to="/books" onClick={() => setMenuOpen(false)}>Books</NavLink>
              <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>

              <hr />

              {user ? (
                <>
                  <div className="mobile-user">
                    👤 {user.username || user.name}
                  </div>
                  <NavLink to="/profile" onClick={() => setMenuOpen(false)}>My Profile</NavLink>
                  <NavLink to="/my-books" onClick={() => setMenuOpen(false)}>My Books</NavLink>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  Sign In
                </NavLink>
              )}
            </div>
          )}

        </div>
      </header>

      {/* 🔒 EXISTING CSS (UNCHANGED) + EXTRA CSS */}
      <style>{`
        .user-header {
          background: linear-gradient(135deg, #0d6efd, #084298);
          color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
        }

        .user-nav {
          display: flex;
          align-items: center;
        }

        .user-nav .nav-link {
          margin-left: 24px;
          color: #fff;
          text-decoration: none;
          position: relative;
        }

        .user-nav .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0;
          height: 2px;
          background: #fff;
          transition: 0.3s;
        }

        .user-nav .nav-link:hover::after,
        .user-nav .nav-link.active::after {
          width: 100%;
        }

        .user-auth {
          margin-left: 25px;
          position: relative;
        }

        .signin-btn {
          background: #fff;
          color: #0d6efd;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 600;
          text-decoration: none;
        }

        .profile-btn {
          background: transparent;
          border: 1px solid #fff;
          color: #fff;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 42px;
          background: #fff;
          border-radius: 10px;
          min-width: 160px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
          overflow: hidden;
        }

        .dropdown-menu a,
        .dropdown-menu button {
          display: block;
          padding: 10px 15px;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          color: #333;
          font-size: 14px;
        }

        .dropdown-menu a:hover,
        .dropdown-menu button:hover {
          background: #f1f1f1;
        }

        @media(max-width:768px){
          .user-nav {
            display: none;
          }
        }

        /* EXTRA MOBILE/TABLET MENU */
        .mobile-menu{
          background:#fff;
          margin:10px;
          padding:15px;
          border-radius:12px;
          box-shadow:0 6px 15px rgba(0,0,0,0.2);
        }

        .mobile-menu a,
        .mobile-menu button{
          display:block;
          padding:10px 0;
          width:100%;
          text-align:left;
          background:none;
          border:none;
          color:#333;
          text-decoration:none;
          font-size:15px;
          cursor:pointer;
        }

        .mobile-user{
          font-weight:600;
          margin-bottom:8px;
        }
      `}</style>
    </>
  )
}

export default Header
