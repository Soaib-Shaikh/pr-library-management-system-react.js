import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useBooks = () => {
  const [list, setList] = useState([])
  const [book, setBook] = useState({})
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const currentItem = list.slice(firstIndex, lastIndex)
  const totalPage = Math.ceil(list.length / itemsPerPage)

  // 🔹 LOAD BOOKS
  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    const res = await fetch('http://localhost:3000/books')
    const data = await res.json()
    setList(data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setBook(prev => ({ ...prev, [name]: value }))
  }

  // 🔹 ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (book.id) {
      // UPDATE
      await fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
      })
    } else {
      // ADD
      await fetch('http://localhost:3000/books', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...book,
          borrowedBy: [],
          borrowed: 0
        })
      })
    }

    setBook({})
    fetchBooks()
    navigate('/admin/view-books')
  }

  // 🔹 DELETE
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE"
    })
    fetchBooks()
  }

  // 🔹 EDIT
  const handleEdit = (id) => {
    const editData = list.find(b => b.id === id)
    setBook({ ...editData })
    navigate('/admin/add-book')
  }

  // 🔹 BORROW
  const handleBorrowBook = async (book) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (!currentUser) return alert("Login first")

    if (book.borrowedBy.includes(currentUser.id)) return

    if (book.borrowedBy.length >= book.count) {
      alert("Out of stock")
      return
    }

    const updated = {
      ...book,
      borrowedBy: [...book.borrowedBy, currentUser.id],
      borrowed: book.borrowedBy.length + 1
    }

    await fetch(`http://localhost:3000/books/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    })

    fetchBooks()
  }

  // 🔹 RETURN
  const handleReturnBook = async (book) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (!currentUser) return

    const updated = {
      ...book,
      borrowedBy: book.borrowedBy.filter(id => id !== currentUser.id),
      borrowed: book.borrowedBy.length - 1
    }

    await fetch(`http://localhost:3000/books/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    })

    fetchBooks()
  }

  return {
    list,
    book,
    setBook,
    handleChange,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleBorrowBook,
    handleReturnBook,
    currentItem,
    currentPage,
    totalPage,
    setCurrentPage
  }
}
