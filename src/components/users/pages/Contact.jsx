import React, { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    bookName: '',
    issueType: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Contact Request:', form)
    alert('Your message has been sent successfully 📩')

    setForm({
      name: '',
      email: '',
      bookName: '',
      issueType: '',
      message: ''
    })
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact the Library</h1>
          <p>We are here to help you with books, accounts, and support.</p>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <div className="container my-5">
        <div className="row">

          {/* INFO PANEL */}
          <div className="col-md-4 mb-4">
            <div className="contact-info">
              <h4>📍 Library Help Desk</h4>
              <p>
                Main City Library<br />
                Knowledge Street, Block A
              </p>

              <p>
                <strong>🕒 Timings</strong><br />
                Mon – Sat: 9:00 AM – 7:00 PM
              </p>

              <p>
                <strong>📧 Email</strong><br />
                support@library.com
              </p>

              <p>
                <strong>📞 Phone</strong><br />
                +91 98765 43210
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="col-md-8">
            <div className="contact-card">
              <h3 className="mb-4">Send Us a Message</h3>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Book Name (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bookName"
                    value={form.bookName}
                    onChange={handleChange}
                    placeholder="React Basics, Node Guide..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Issue Type</label>
                  <select
                    className="form-select"
                    name="issueType"
                    value={form.issueType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Issue</option>
                    <option value="availability">Book Availability</option>
                    <option value="borrow">Borrow Issue</option>
                    <option value="return">Return Issue</option>
                    <option value="account">Account Related</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* ===== CSS ===== */}
      <style>{`
        .contact-hero {
          background: linear-gradient(135deg, #0d6efd, #084298);
          color: #fff;
          padding: 70px 0;
          text-align: center;
        }

        .contact-hero h1 {
          font-size: 44px;
          font-weight: 700;
        }

        .contact-hero p {
          font-size: 17px;
          opacity: 0.9;
        }

        .contact-info {
          background: #f8f9fa;
          padding: 25px;
          border-radius: 16px;
          height: 100%;
        }

        .contact-card {
          background: #fff;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .contact-card h3 {
          font-weight: 600;
        }

        @media(max-width:768px){
          .contact-hero h1 {
            font-size: 30px;
          }
        }
      `}</style>
    </>
  )
}

export default Contact
