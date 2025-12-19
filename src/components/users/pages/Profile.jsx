import React, { useState, useEffect, useRef } from 'react'

function Profile() {
  const [user, setUser] = useState(null)
  const [edit, setEdit] = useState(false)
  const fileRef = useRef()

  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    image: ''
  })

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    setUser(loggedUser)

    if (loggedUser) {
      setForm({
        name: loggedUser.name || '',
        email: loggedUser.email || '',
        username: loggedUser.username || '',
        image: loggedUser.image || ''
      })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // 🔥 IMAGE CHANGE HANDLER
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result })
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    const updatedUser = { ...user, ...form }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
    setEdit(false)
    alert('Profile updated successfully ✅')
  }

  if (!user) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-warning">
          Please login to view your profile.
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="profile-hero">
        <div className="container">
          <h1>My Profile</h1>
          <p>Manage your personal library account</p>
        </div>
      </section>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">

            <div className="profile-card">
              <div className="profile-header">

                {/* PROFILE IMAGE */}
                <div
                  className="avatar"
                  onClick={() => edit && fileRef.current.click()}
                  title={edit ? 'Click to change image' : ''}
                >
                  {form.image ? (
                    <img src={form.image} alt="Profile" />
                  ) : (
                    <span>👤</span>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileRef}
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />

                <h4>{user.name || user.username}</h4>
                <p className="text-muted">{user.email}</p>
                {edit && <small className="text-primary">Click image to change</small>}
              </div>

              <hr />

              {/* PROFILE FORM */}
              <div className="profile-body">
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={!edit}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    disabled={!edit}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!edit}
                  />
                </div>

                {edit ? (
                  <div className="d-flex gap-2">
                    <button className="btn btn-success" onClick={handleSave}>
                      Save Changes
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setEdit(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===== CSS ===== */}
      <style>{`
        .profile-hero {
          background: linear-gradient(135deg, #0d6efd, #084298);
          color: #fff;
          padding: 60px 0;
          text-align: center;
        }

        .profile-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 22px rgba(0,0,0,0.12);
          padding: 30px;
        }

        .profile-header {
          text-align: center;
        }

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: #e9ecef;
          margin: 0 auto 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          cursor: pointer;
          overflow: hidden;
          border: 3px solid #0d6efd;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media(max-width:768px){
          .profile-hero h1 {
            font-size: 28px;
          }
        }
      `}</style>
    </>
  )
}

export default Profile
