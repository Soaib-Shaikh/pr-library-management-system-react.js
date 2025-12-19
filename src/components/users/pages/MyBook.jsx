import React from 'react'
import { useBooks } from '../../../hooks/useBooks'

function MyBook() {
  const { list, handleReturnBook, handleRemoveAllBooks } = useBooks()

  const currentUser = JSON.parse(localStorage.getItem('user'))

  const borrow = list.filter(
    b => b.borrowedBy && b.borrowedBy.includes(currentUser?.id)
  )

  return (
    <>
      {/* ===== PAGE HEADER ===== */}
      <section className="mybooks-hero">
        <div className="container">
          <h1>My Borrowed Books</h1>
          <p>Manage the books you have currently borrowed</p>
        </div>
      </section>

      <div className="container my-5">

        {/* ===== SUMMARY BAR ===== */}
        <div className="summary-bar">
          <div>
            <strong>Total Borrowed:</strong> {borrow.length}
          </div>

          {borrow.length > 0 && (
            <button
              className="btn btn-outline-danger"
              onClick={handleRemoveAllBooks}
            >
              Remove All
            </button>
          )}
        </div>

        {/* ===== CONTENT ===== */}
        {borrow.length === 0 ? (
          <div className="empty-state">
            📖 You have not borrowed any books yet.
          </div>
        ) : (
          <div className="row g-4">
            {borrow.map((book, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                <div className="mybook-card h-100">

                  <img
                    src={book.image}
                    alt={book.bookName}
                    className="mybook-img"
                  />

                  <div className="mybook-body">
                    <h5>{book.bookName}</h5>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Category:</strong> {book.category}</p>

                    <button
                      className="btn btn-sm btn-danger w-100 mt-3"
                      onClick={() => handleReturnBook(book.id)}
                    >
                      Return Book
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== CSS ===== */}
      <style>{`
        .mybooks-hero {
          background: linear-gradient(135deg, #0d6efd, #084298);
          color: #fff;
          padding: 55px 0;
          text-align: center;
        }

        .mybooks-hero h1 {
          font-size: 40px;
          font-weight: 700;
        }

        .mybooks-hero p {
          font-size: 16px;
          opacity: 0.9;
        }

        .summary-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8f9fa;
          padding: 15px 20px;
          border-radius: 14px;
          margin-bottom: 30px;
        }

        .empty-state {
          background: #f8f9fa;
          padding: 40px;
          text-align: center;
          border-radius: 16px;
          font-size: 16px;
          color: #555;
        }

        .mybook-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .mybook-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .mybook-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .mybook-body h5 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .mybook-body p {
          font-size: 14px;
          color: #555;
          margin-bottom: 6px;
        }

        @media(max-width:768px){
          .mybooks-hero h1 {
            font-size: 28px;
          }

          .summary-bar {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }
      `}</style>
    </>
  )
}

export default MyBook
