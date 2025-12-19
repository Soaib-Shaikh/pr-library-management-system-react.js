import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { useBooks } from '../../../hooks/useBooks'

function Dashboard() {

  const { list, currentPage, totalPage, setCurrentPage } = useBooks()

  const users = JSON.parse(localStorage.getItem('users')) || []

  const totalBooks = list.length
  const totalStock = list.reduce((s, b) => s + b.count, 0)
  const borrowedBooks = list.reduce((s, b) => s + b.borrowed, 0)
  const availableBooks = totalStock - borrowedBooks

  const chartData = [
    { name: 'Borrowed', value: borrowedBooks },
    { name: 'Available', value: availableBooks },
    { name: 'Total Stock', value: totalStock }
  ]

  const itemsPerPage = 5
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedList = list.slice(startIndex, startIndex + itemsPerPage)

  const handleUserDelete = (id) => {
    const newUsers = users.filter(u => u.id !== id)
    localStorage.setItem('users', JSON.stringify(newUsers))
    window.location.reload()
  }

  return (
    <div className="dashboard-container">

      {/* ===== CARDS ===== */}
      <div className="row g-4 mb-4">
        <div className="col-md-3"><div className="dashboard-card red">📚<h3>{totalBooks}</h3><p>Total Books</p></div></div>
        <div className="col-md-3"><div className="dashboard-card blue">📘<h3>{borrowedBooks}</h3><p>Borrowed</p></div></div>
        <div className="col-md-3"><div className="dashboard-card green">📗<h3>{availableBooks}</h3><p>Available</p></div></div>
        <div className="col-md-3"><div className="dashboard-card orange">👥<h3>{users.length}</h3><p>Users</p></div></div>
      </div>

      {/* ===== CHART ===== */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#0d6efd" />
        </BarChart>
      </ResponsiveContainer>

      {/* ===== BOOK TABLE ===== */}
      <h4 className="mt-5">Books</h4>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th><th>Name</th><th>Author</th><th>Total</th><th>Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {paginatedList.map((b, i) => (
            <tr key={b.id}>
              <td>{startIndex + i + 1}</td>
              <td>{b.bookName}</td>
              <td>{b.author}</td>
              <td>{b.count}</td>
              <td>{b.borrowed}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== USERS TABLE ===== */}
      <h4 className="mt-5">Users</h4>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th><th>Name</th><th>Email</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? users.map((u, i) => (
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
          )) : (
            <tr><td colSpan="4">No users</td></tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Dashboard
