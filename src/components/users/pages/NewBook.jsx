import React, { useEffect, useState } from 'react'
import { useBooks } from '../../../hooks/useBooks'

function NewBook() {
  const { list, handleBorrowBook } = useBooks()

  const STEP = 4 // kitni books ek baar me add ho
  const [visibleCount, setVisibleCount] = useState(STEP)
  const [booksToShow, setBooksToShow] = useState([])

  useEffect(() => {
    const availableBooks = list.filter(book => book.count > 0)
    setBooksToShow(availableBooks)
    setVisibleCount(STEP) // reset when list changes
  }, [list])

  const visibleBooks = booksToShow.slice(0, visibleCount)

  const handleExploreMore = () => {
    if (visibleCount >= booksToShow.length) {
      // 🔁 reset
      setVisibleCount(STEP)
    } else {
      // ➕ show next batch
      setVisibleCount(prev => prev + STEP)
    }
  }

  const isAllVisible = visibleCount >= booksToShow.length

  return (
    <section className="new-books">
      <div className="container">
        <h3 className="mt-3">✨ New Books</h3>

        <div className="row g-4 mt-2">
          {visibleBooks.map(book => (
            <div key={book.id} className="col-md-3 col-sm-6">
              <div className="book-card shadow-sm h-100 d-flex flex-column">
                <div className="book-image position-relative">
                  <img
                    src={book.image}
                    alt={book.bookName}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <span className="position-absolute top-0 start-0 badge bg-success m-2">
                    New
                  </span>
                </div>

                <div className="book-info flex-grow-1 p-3 d-flex flex-column">
                  <h5 className="book-title mb-2">{book.bookName}</h5>
                  <p className="book-author mb-1">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="book-category mb-3">
                    <strong>Category:</strong> {book.category}
                  </p>

                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleBorrowBook(book.id)}
                    disabled={book.count === 0}
                  >
                    {book.count === 0 ? 'Out of Stock' : 'Borrow Book'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== LOAD MORE / RESET ===== */}
        {booksToShow.length > STEP && (
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary px-4"
              onClick={handleExploreMore}
            >
              {isAllVisible ? 'Show Less' : 'Explore More Books'}
            </button>
          </div>
        )}
      </div>

      <style>{`
        h3 {
          color: #0d6efd;
          font-weight: 700;
        }

        .book-card {
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .book-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .book-title {
          font-size: 16px;
          font-weight: 600;
        }

        .book-author,
        .book-category {
          font-size: 14px;
          color: #555;
        }

        .btn-primary {
          background-color: #0d6efd;
          border: none;
        }

        .btn-primary:hover {
          background-color: #084298;
        }
      `}</style>
    </section>
  )
}

export default NewBook
