import React, { useState } from 'react'

function About() {
  const [show, setShow] = useState(false)

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="about-hero">
        <div className="container">
          <h1>About Our Library</h1>
          <p>
            A place where knowledge, learning, and community come together.
          </p>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="container my-5">
        <div className="row align-items-center mb-5">

          {/* IMAGE */}
          <div className="col-md-6 mb-4">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000"
              alt="Library"
              className="about-img"
            />
          </div>

          {/* TEXT */}
          <div className="col-md-6">
            <h2 className="mb-3">Who We Are</h2>

            <p>
              Our Library is a modern and inclusive library dedicated to
              providing access to knowledge, information, and learning
              resources for readers of all ages.
            </p>

            {show && (
              <div className="about-detail">
                <p>
                  We believe libraries play a vital role in personal growth,
                  academic success, and lifelong learning. Our carefully
                  curated collection includes academic resources, fiction,
                  non-fiction, research materials, and digital content.
                </p>

                <p>
                  Our goal is to create a welcoming environment where students,
                  professionals, and book lovers can explore ideas and expand
                  their understanding of the world.
                </p>
              </div>
            )}

            <button
              className="btn btn-outline-primary mt-3"
              onClick={() => setShow(!show)}
            >
              {show ? 'Hide Details' : 'Read More'}
            </button>
          </div>
        </div>

        {/* ===== MISSION / VISION / VALUES ===== */}
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="about-card">
              <h4>📖 Our Mission</h4>
              <p>
                To provide free and easy access to information, supporting
                education and lifelong learning for everyone.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="about-card">
              <h4>🎯 Our Vision</h4>
              <p>
                To be a trusted knowledge hub that inspires curiosity,
                creativity, and intellectual growth.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="about-card">
              <h4>🤝 Our Values</h4>
              <p>
                Inclusivity, integrity, accessibility, and a commitment to
                learning for all members of our community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CSS ===== */}
      <style>{`
        .about-hero {
          background: linear-gradient(135deg, #0d6efd, #084298);
          color: #fff;
          padding: 80px 0;
          text-align: center;
        }

        .about-hero h1 {
          font-size: 48px;
          font-weight: 700;
        }

        .about-hero p {
          font-size: 18px;
          margin-top: 10px;
          opacity: 0.9;
        }

        .about-img {
          width: 100%;
          border-radius: 18px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .about-detail {
          background: #f8f9fa;
          padding: 18px;
          border-radius: 12px;
          margin-top: 15px;
        }

        .about-card {
          background: #fff;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          height: 100%;
        }

        .about-card h4 {
          margin-bottom: 12px;
          font-weight: 600;
        }

        @media(max-width:768px){
          .about-hero h1 {
            font-size: 32px;
          }
        }
      `}</style>
    </>
  )
}

export default About
