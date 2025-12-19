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

function Dashboard() {
  const {
    list,
    currentPage,
    totalPage,
    setCurrentPage
  } = useBooks()

  const users = JSON.parse(localStorage.getItem('users')) || []

  // ===== SAFETY =====
  const safeList = list.map(b => ({
    ...b,
    count: Number(b.count) || 0,
    borrowed: Number(b.borrowed) || 0
  }))

  // ===== DASHBOARD CALC (FULL LIST) =====
  const totalBooks = safeList.length
  const totalStock = safeList.reduce((s, b) => s + b.count, 0)
  const borrowedBooks = safeList.reduce((s, b) => s + b.borrowed, 0)
  const availableBooks = totalStock - borrowedBooks

  const chartData = [
    { name: 'Borrowed', value: borrowedBooks },
    { name: 'Available', value: availableBooks },
    { name: 'Total Stock', value: totalStock }
  ]

  // ===== PAGINATION (BOOK TABLE ONLY) =====
  const itemsPerPage = 5
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedList = safeList.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  // ===== USER DELETE =====
  const handleUserDelete = (id) => {
    const newUsers = users.filter(u => u.id !== id)
    localStorage.setItem('users', JSON.stringify(newUsers))
    window.location.reload()
  }

  return (
    <div className="dashboard-container p-3">

      {/* ===== CARDS ===== */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="dashboard-card red">
            📚
            <h3>{totalBooks}</h3>
            <p>Total Books</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card blue">
            📘
            <h3>{borrowedBooks}</h3>
            <p>Borrowed</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card green">
            📗
            <h3>{availableBooks}</h3>
            <p>Available</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card orange">
            👥
            <h3>{users.length}</h3>
            <p>Users</p>
          </div>
        </div>
      </div>

      {/* ===== CHART ===== */}
      <div className="mb-5">
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

      {/* ===== BOOK TABLE ===== */}
      <h4 className="mt-4 mb-2">Books</h4>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Author</th>
              <th>Total</th>
              <th>Borrowed</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.length > 0 ? (
              paginatedList.map((b, i) => (
                <tr key={b.id}>
                  <td>{startIndex + i + 1}</td>
                  <td>{b.bookName}</td>
                  <td>{b.author}</td>
                  <td>{b.count}</td>
                  <td>{b.borrowed}</td>
                  <td>{b.count - b.borrowed}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No books available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== PAGINATION CONTROLS ===== */}
      {totalPage > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
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
      )}

      {/* ===== USERS TABLE ===== */}
      <h4 className="mt-5 mb-2">Users</h4>
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u, i) => (
                <tr key={u.id}>
                  <td>{i + 1}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleUserDelete(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Dashboard
