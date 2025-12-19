import React from 'react'
import { useBooks } from '../../../hooks/useBooks'

function ViewBooks({  }) {

  const {
    currentItem,
    currentPage,
    totalPage,
    setCurrentPage,
    handleDelete, 
    handleEdit
  } = useBooks()

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-12">
          <div className="table-responsive">
            <h2 className="text-center mb-3">View Books</h2>

            <table className="table table-bordered table-striped text-center table-hover">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Book Image</th>
                  <th>Book Name</th>
                  <th>Book Author</th>
                  <th>Book Count</th>
                  <th>Book Category</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItem.length > 0 ? (
                  currentItem.map((val, index) => {
                    const { image, bookName, author, count, category, id } = val

                    return (
                      <tr key={id}>
                        {/* ✅ CONTINUOUS INDEX */}
                        <td>{(currentPage - 1) * 5 + index + 1}</td>

                        <td>
                          <img
                            src={image}
                            alt={bookName}
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover'
                            }}
                          />
                        </td>

                        <td>{bookName}</td>
                        <td>{author}</td>
                        <td>{count}</td>
                        <td>{category}</td>

                        <td>
                          <button
                            onClick={() => handleDelete(id)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>{' '}
                          <button
                            onClick={() => handleEdit(id)}
                            className="btn btn-warning btn-sm"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="7">No books available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ===== PAGINATION ===== */}
          <div className="d-flex justify-content-center mt-3 gap-2">
            <button
              className="btn btn-secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            {[...Array(totalPage)].map((_, i) => (
              <button
                key={i}
                className={`btn ${
                  currentPage === i + 1
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-secondary"
              disabled={currentPage === totalPage}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ViewBooks
