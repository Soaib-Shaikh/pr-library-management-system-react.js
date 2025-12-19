import React, { useState, useEffect } from 'react'
import { useBooks } from '../../../hooks/useBooks'

function Category() {
  const { list, handleBorrowBook } = useBooks();

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    const uniqueCategories = [...new Set(list.map(book => book.category))]
    setCategories(uniqueCategories)
  }, [list])

  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredBooks(list)
    } else {
      setFilteredBooks(list.filter(book => book.category === selectedCategory))
    }
  }, [selectedCategory, list])

  return (
    <section className='category-book'>
      <div className="container mt-5">
        <div className="row align-items-center mb-4">
          <div className="col-md-6">
            <h2 className="text-start mb-0">📂 Category</h2>
          </div>
          <div className="col-md-6 text-end">
            <select
              className="form-select w-50 d-inline-block"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value=''>All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row g-4">
          {filteredBooks.length === 0 ? (
            <p className="text-center">No books available in this category.</p>
          ) : (
            filteredBooks.map(book => (
              <div key={book.id} className="col-md-3 col-sm-6">
                <div className="book-card shadow-sm h-100 d-flex flex-column">
                  <div className="book-image">
                    <img 
                      src={book.image} 
                      alt={book.bookName} 
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  </div>

                  <div className="book-info flex-grow-1 p-3 d-flex flex-column">
                    <h5 className="book-title mb-2">{book.bookName}</h5>
                    <p className="book-author mb-1"><strong>Author:</strong> {book.author}</p>
                    <p className="book-category mb-3"><strong>Category:</strong> {book.category}</p>

                    <button 
                      className="btn btn-primary mt-auto"
                      onClick={() => handleBorrowBook(book.id)}
                      disabled={book.count == 0}
                    >
                      {book.count == 0 ? 'Out of Stock' : 'Borrow Book'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        h2 { color: #0d6efd; font-weight: 700; }
        .book-card { border-radius: 12px; overflow: hidden; background: #fff; transition: transform 0.3s, box-shadow 0.3s; }
        .book-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
        .book-title { font-size: 16px; font-weight: 600; }
        .book-author, .book-category { font-size: 14px; color: #555; }
        .btn-primary { background-color: #0d6efd; border: none; transition: 0.3s; }
        .btn-primary:hover { background-color: #084298; }
      `}</style>
    </section>
  )
}

export default Category
