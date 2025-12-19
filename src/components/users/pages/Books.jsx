import React from 'react'
import { useBooks } from '../../../hooks/useBooks'

function Books() {
  const { list, handleBorrowBook } = useBooks()

  return (
    <>
      {/* ===== PAGE HEADER ===== */}
      <section className="books-hero">
        <div className="container">
          <h1>Library Book Collection</h1>
          <p>Browse and borrow books from our curated library catalog</p>
        </div>
      </section>

      {/* ===== BOOK LIST ===== */}
      <div className="container my-5">
        <div className="row g-4">
          {list.map((book) => (
            <div key={book.id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="library-book-card h-100">

                {/* IMAGE */}
                <div className="library-book-img">
                  <img src={book.image} alt={book.bookName} />
                  <span
                    className={`availability-badge ${
                      book.count === 0 ? 'out' : 'in'
                    }`}
                  >
                    {book.count === 0 ? 'Out of Stock' : 'Available'}
                  </span>
                </div>

                {/* INFO */}
                <div className="library-book-body">
                  <h5>{book.bookName}</h5>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Category:</strong> {book.category}</p>

                  <button
                    className="btn btn-outline-primary w-100 mt-3"
                    onClick={() => handleBorrowBook(book.id)}
                    disabled={book.count === 0}
                  >
                    Borrow Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CSS ===== */}
      <style>{`
        .books-hero {
          background: linear-gradient(135deg, #0d6efd, #084298);
          color: #fff;
          padding: 60px 0;
          text-align: center;
        }

        .books-hero h1 {
          font-size: 42px;
          font-weight: 700;
        }

        .books-hero p {
          font-size: 17px;
          opacity: 0.9;
        }

        .library-book-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .library-book-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.18);
        }

        .library-book-img {
          position: relative;
          height: 220px;
        }

        .library-book-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .availability-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #fff;
        }

        .availability-badge.in {
          background: #198754;
        }

        .availability-badge.out {
          background: #dc3545;
        }

        .library-book-body {
          padding: 18px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .library-book-body h5 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .library-book-body p {
          font-size: 14px;
          color: #555;
          margin-bottom: 6px;
        }

        @media(max-width:768px){
          .books-hero h1 {
            font-size: 30px;
          }
        }
      `}</style>
    </>
  )
}

export default Books
