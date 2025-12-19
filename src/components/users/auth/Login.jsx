import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Login() {
  const [user, setUser] = useState({})
  const [userList, setUserList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const oldList = JSON.parse(localStorage.getItem('users')) || []
    setUserList(oldList)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const foundUser = userList.find(
      u => u.email === user.email && u.password === user.password
    )

    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser))
      navigate('/')
    } else {
      alert('Invalid Email or Password')
    }
  }

  return (
    <>
      {/* ====== LOGIN PAGE ====== */}
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Welcome Back 👋</h2>
          <p className="login-subtitle">Login to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            <button className="login-btn">Login</button>
          </form>

          <div className="login-links">
            <span>
              Don’t have an account?
              <NavLink to="/signup"> Signup</NavLink>
            </span>

            <NavLink to="/admin/login" className="admin-link">
              Admin Login
            </NavLink>
          </div>
        </div>
      </div>

      {/* ====== CSS ====== */}
      <style>{`
        .login-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          font-family: 'Segoe UI', sans-serif;
        }

        .login-card {
          width: 380px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          padding: 35px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
          color: #fff;
          animation: fadeIn 0.8s ease;
        }

        .login-title {
          text-align: center;
          font-size: 26px;
          margin-bottom: 5px;
        }

        .login-subtitle {
          text-align: center;
          font-size: 14px;
          color: #ccc;
          margin-bottom: 25px;
        }

        .input-box {
          margin-bottom: 18px;
        }

        .input-box input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 8px;
          border: none;
          outline: none;
          background: rgba(255,255,255,0.15);
          color: #fff;
          font-size: 14px;
        }

        .input-box input::placeholder {
          color: #ddd;
        }

        .login-btn {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,114,255,0.5);
        }

        .login-links {
          text-align: center;
          margin-top: 18px;
          font-size: 14px;
        }

        .login-links a {
          color: #00c6ff;
          text-decoration: none;
          font-weight: 500;
          margin-left: 5px;
        }

        .admin-link {
          display: block;
          margin-top: 10px;
          color: #ff7675 !important;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default Login
