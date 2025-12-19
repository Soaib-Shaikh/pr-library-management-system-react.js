// src/components/admin/AdminLogin.js
import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function AdminLogin() {
  const [admin, setAdmin] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const defaultAdmin = {
      email: 'admin@gmail.com',
      password: 'admin123'
    }

    const storedAdmin = JSON.parse(localStorage.getItem('admin'))
    if (!storedAdmin) {
      localStorage.setItem('admin', JSON.stringify(defaultAdmin))
    }

    const isAdmin = localStorage.getItem('adminAuth')
    if (isAdmin === 'true') {
      navigate('/admin')
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setAdmin({ ...admin, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const storedAdmin = JSON.parse(localStorage.getItem('admin'))

    if (
      storedAdmin &&
      storedAdmin.email === admin.email &&
      storedAdmin.password === admin.password
    ) {
      localStorage.setItem('adminAuth', 'true')
      navigate('/admin')
    } else {
      alert('❌ Invalid Admin Email or Password')
    }
  }

  return (
    <>

      <div className="admin-login-wrapper">
        <div className="admin-login-card">

          <div className="admin-header">
            <h2>🔐 Admin Login</h2>
            <p>Library Management System</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Admin Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={admin.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={admin.password}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary w-100">
              Login as Admin
            </button>
          </form>

          <div className="text-center mt-3">
            <NavLink to="/login" className="back-link">
              ← Back to User Login
            </NavLink>
          </div>

        </div>
      </div>

      {/* ===== CSS ===== */}
      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #0d6efd, #084298);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .admin-login-card {
          background: #fff;
          padding: 35px;
          border-radius: 18px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .admin-header {
          text-align: center;
          margin-bottom: 25px;
        }

        .admin-header h2 {
          font-weight: 700;
        }

        .admin-header p {
          color: #666;
          font-size: 14px;
        }

        .admin-cred {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 12px;
          margin-top: 20px;
          font-size: 14px;
          text-align: center;
        }

        .back-link {
          text-decoration: none;
          color: #6c757d;
        }

        .back-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}

export default AdminLogin
