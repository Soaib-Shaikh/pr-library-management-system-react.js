
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Headers from '../admin/Headers';
import AddBook from '../admin/pages/AddBook';
import Dashboard from '../admin/pages/Dashboard';
import ViewBooks from '../admin/pages/ViewBooks';
import { useBooks } from '../../hooks/useBooks';

function AdminLayouts() {
  const navigate = useNavigate();
  const { list, book, handleChange, handleSubmit, handleDelete, handleEdit } = useBooks();

  // Admin auth check
  useEffect(() => {
    const isAdmin = localStorage.getItem('adminAuth');
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  }

  return (
    <>
      {/* Admin Header with logout */}
      <Headers handleLogout={handleLogout} />

      <div className="main-content">
        <Routes>
          <Route index element={<Dashboard list={list} />} />
          <Route
            path="add-book"
            element={<AddBook book={book} handleChange={handleChange} handleSubmit={handleSubmit} />}
          />
          <Route
            path="view-books"
            element={<ViewBooks list={list} handleDelete={handleDelete} handleEdit={handleEdit} />}
          />
        </Routes>
      </div>

      <style>{`
        .main-content {
          margin-left: 260px; /* Assuming sidebar width */
          padding: 30px;
        }
      `}</style>
    </>
  );
}

export default AdminLayouts;
