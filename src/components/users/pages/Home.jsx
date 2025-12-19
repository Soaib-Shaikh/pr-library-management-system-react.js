import React from 'react'
import NewBook from './NewBook'
import Category from './Category'
import { useBooks } from '../../../hooks/useBooks'

function Home() {
  const { list, handleBorrowBook } = useBooks()

  return (
    <>
      {/* ===== HERO / CAROUSEL ===== */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide hero-carousel"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={3} />
        </div>

        <div className="carousel-inner">
          {[
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1920&h=700&fit=crop",
            "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1920&h=700&fit=crop",
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920&h=700&fit=crop",
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1920&h=700&fit=crop"
          ].map((img, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
              <img src={img} className="d-block w-100 hero-img" alt="library" />
              <div className="carousel-caption hero-caption">
                <h1>Explore Your Next Book</h1>
                <p>Borrow, Read & Grow with our digital library</p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" />
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" />
        </button>
      </div>

      {/* ===== NEW BOOKS ===== */}
      <section className="home-section">
        <div className="container">
          <h2 className="section-title">📘 New Arrivals</h2>
          <NewBook list={list} handleBorrowBook={handleBorrowBook} />
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="home-section bg-light">
        <div className="container">
          <h2 className="section-title">📚 Browse by Category</h2>
          <Category list={list} handleBorrowBook={handleBorrowBook} />
        </div>
      </section>

      {/* ===== EXTRA CSS ===== */}
      <style>{`
        .hero-carousel {
          margin-bottom: 60px;
        }

        .hero-img {
          height: 85vh;
          object-fit: cover;
          filter: brightness(70%);
        }

        .hero-caption {
          bottom: 35%;
        }

        .hero-caption h1 {
          font-size: 48px;
          font-weight: 700;
        }

        .hero-caption p {
          font-size: 18px;
          margin-top: 10px;
        }

        .home-section {
          padding: 60px 0;
        }

        .home-section.bg-light {
          background: #f8f9fa;
        }

        .section-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 30px;
          text-align: center;
        }

        @media(max-width:768px){
          .hero-img {
            height: 60vh;
          }

          .hero-caption h1 {
            font-size: 28px;
          }

          .section-title {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  )
}

export default Home
