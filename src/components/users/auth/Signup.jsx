import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Signup() {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch('http://localhost:3000/users', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, id: Date.now() })
    })

    navigate('/login')
  }

  return (
    <>
      <div className="signup-page">
        <div className="signup-box">
          <h2>Create Account</h2>
          <p className="subtitle">Start your journey with us</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                onChange={handleChange}
                required
              />
            </div>

            <button className="signup-btn">Create Account</button>
          </form>

          <div className="footer-text">
            Already registered?
            <NavLink to="/login"> Login</NavLink>
          </div>
        </div>
      </div>

      <style>{`
        .signup-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #4f46e5;
          font-family: 'Segoe UI', sans-serif;
        }

        .signup-box {
          width: 420px;
          padding: 40px 35px;
          border-radius: 16px;
          background: linear-gradient(180deg, #ffffff, #f9fafb);
          box-shadow: 0 12px 35px rgba(0,0,0,0.08);
          border-top: 5px solid #4f46e5;
        }

        .signup-box h2 {
          text-align: center;
          font-size: 26px;
          font-weight: 700;
          color: #111827;
        }

        .subtitle {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 28px;
        }

        .field {
          margin-bottom: 18px;
        }

        .field input {
          width: 100%;
          padding: 13px 15px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          font-size: 14px;
          transition: 0.3s;
          background: #fff;
        }

        .field input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79,70,229,0.15);
        }

        .signup-btn {
          width: 100%;
          padding: 13px;
          margin-top: 5px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .signup-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(79,70,229,0.35);
        }

        .footer-text {
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
          color: #374151;
        }

        .footer-text a {
          color: #4f46e5;
          font-weight: 600;
          text-decoration: none;
          margin-left: 5px;
        }
      `}</style>
    </>
  )
}

export default Signup
