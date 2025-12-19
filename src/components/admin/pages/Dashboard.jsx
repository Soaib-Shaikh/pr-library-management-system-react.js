import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { useBooks } from '../../../hooks/useBooks'

function Dashboard({ list = [] }) {

  const {
    currentItem,
    currentPage,
    totalPage,
    setCurrentPage
  } = useBooks()

  const safeList = list.map(b => ({
    ...b,
    count: Math.max(0, Number(b.count) || 0),
    borrowed: Math.max(0, Number(b.borrowed) || 0)
  }))


  const itemsPerPage = 5
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedList = safeList.slice(startIndex, startIndex + itemsPerPage)

  const totalBooks = safeList.length
  const totalStock = safeList.reduce((s, b) => s + b.count, 0)
  const borrowedBooks = safeList.reduce((s, b) => s + b.borrowed, 0)
  const availableBooks = totalStock - borrowedBooks

  const members = JSON.parse(localStorage.getItem('users'))?.length || 0

  const chartData = [
    { name: 'Borrowed', value: borrowedBooks },
    { name: 'Available', value: availableBooks },
    { name: 'Total Stock', value: totalStock }
  ]

  return (
    <div className="dashboard-container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-4 mb-4">

        <div className="col">
          <div className="dashboard-card red">
            <div className="card-icon">📖</div>
            <p>Total Books</p>
            <h3>{totalBooks}</h3>
          </div>
        </div>

        <div className="col">
          <div className="dashboard-card blue">
            <div className="card-icon">📘</div>
            <p>Borrowed Stock</p>
            <h3>{borrowedBooks}</h3>
          </div>
        </div>

        <div className="col">
          <div className="dashboard-card green">
            <div className="card-icon">📗</div>
            <p>Available Stock</p>
            <h3>{availableBooks}</h3>
          </div>
        </div>

        <div className="col">
          <div className="dashboard-card purple">
            <div className="card-icon">📚</div>
            <p>Total Stock</p>
            <h3>{totalStock}</h3>
          </div>
        </div>

        <div className="col">
          <div className="dashboard-card orange">
            <div className="card-icon">👥</div>
            <p>Members</p>
            <h3>{members}</h3>
          </div>
        </div>

      </div>


      <div className="mb-5">
        <h4 className="text-center mb-3">Books Stock Chart</h4>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Sr.No</th>
              <th>Book</th>
              <th>Author</th>
              <th>Category</th>
              <th>Total</th>
              <th>Borrowed</th>
              <th>Available</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedList.map((book, index) => {
              const available = book.count - book.borrowed

              return (
                <tr key={book.id || index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{book.bookName}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.count}</td>
                  <td>{book.borrowed}</td>
                  <td>{available}</td>
                  <td>
                    {book.borrowed == 0 ? (
                      <span className="badge bg-success">Available</span>
                    ) : book.borrowed < book.count ? (
                      <span className="badge bg-warning text-dark">
                        Partially Borrowed
                      </span>
                    ) : (
                      <span className="badge bg-danger">Fully Borrowed</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="d-flex justify-content-center gap-2 mt-3">
          <button
            className="btn btn-secondary"
            disabled={currentPage == 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPage)].map((_, i) => (
            <button
              key={i}
              className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
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

        <div className="mt-5">
          <h4 className="text-center mb-3">Users</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Sr.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {JSON.parse(localStorage.getItem('users'))?.length > 0 ? (
                  JSON.parse(localStorage.getItem('users')).map((user, index) => (
                    <tr key={user.id || index}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            const oldUsers = JSON.parse(localStorage.getItem('users')) || []
                            const newUsers = oldUsers.filter(u => u.id !== user.id)
                            localStorage.setItem('users', JSON.stringify(newUsers))
                            window.location.reload() // simple way to refresh table
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No users available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>


      </div>

      <style>{`
  .dashboard-container {
    padding: 10px;
  }

  /* ===== DASHBOARD CARDS ===== */
  .dashboard-card {
    position: relative;
    padding: 26px 16px;
    border-radius: 16px;
    text-align: center;
    color: #fff;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .dashboard-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0,0,0,0.25);
  }

  .card-icon {
    width: 55px;
    height: 55px;
    margin: 0 auto 12px;
    background: rgba(255,255,255,0.25);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .dashboard-card p {
    margin: 0;
    font-size: 13px;
    opacity: 0.9;
  }

  .dashboard-card h3 {
    margin-top: 8px;
    font-size: 30px;
    font-weight: 700;
  }

  /* COLORS */
  .dashboard-card.blue {
    background: linear-gradient(135deg, #0d6efd, #084298);
  }

  .dashboard-card.green {
    background: linear-gradient(135deg, #198754, #0f5132);
  }

  .dashboard-card.purple {
    background: linear-gradient(135deg, #6f42c1, #432874);
  }

  .dashboard-card.orange {
    background: linear-gradient(135deg, #fd7e14, #b45309);
  }

  .dashboard-card.red {
    background: linear-gradient(135deg, #dc3545, #7a0916);
  }

  /* ===== TABLE RESPONSIVE ===== */
  .table-responsive {
    overflow-x: auto;
  }

  table {
    min-width: 700px;
  }

  table th,
  table td {
    white-space: nowrap;
    vertical-align: middle !important;
    font-size: 14px;
  }

  /* ===== PAGINATION ===== */
  .pagination-wrap {
    flex-wrap: wrap;
  }

  /* ===== CHART ===== */
  .recharts-responsive-container {
    min-height: 280px;
  }

  /* ===== MOBILE ===== */
  @media (max-width: 576px) {
    .dashboard-card {
      padding: 22px 14px;
    }

    .dashboard-card h3 {
      font-size: 26px;
    }

    h4 {
      font-size: 18px;
    }

    table {
      font-size: 13px;
    }

    .btn {
      padding: 6px 10px;
      font-size: 13px;
    }
  }

  /* ===== TABLET ===== */
  @media (max-width: 768px) {
    .dashboard-card h3 {
      font-size: 28px;
    }

    table {
      min-width: 600px;
    }
  }

  /* ===== LARGE SCREENS ===== */
  @media (min-width: 1200px) {
    .dashboard-container {
      max-width: 1300px;
      margin: auto;
    }
  }
`}</style>


    </div>
  )
}

export default Dashboard
