import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

export const useBooks = () => {
  const [list, setList] = useState([])
  const [book, setBook] = useState({})
  const navigate = useNavigate()

  // ===== PAGINATION =====
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const currentItem = list.slice(firstIndex, lastIndex)
  const totalPage = Math.ceil(list.length / itemsPerPage)

  // ===== LOAD BOOKS =====
  useEffect(() => {
    const oldList = JSON.parse(localStorage.getItem('Books')) || []

    const fixedList = oldList.map(b => ({
      ...b,
      count: Number(b.count) || 0,
      borrowed: Number(b.borrowed) || 0,
      borrowedBy: Array.isArray(b.borrowedBy) ? b.borrowedBy : []
    }))

    setList(fixedList)
    localStorage.setItem('Books', JSON.stringify(fixedList))
  }, [])

  // ================= FORM =================
  const handleChange = (e) => {
    const { name, value } = e.target
    setBook(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let newList
    if (book.id) {
      // ✅ EDIT MODE
      newList = list.map(b =>
        b.id === book.id
          ? { ...b, ...book }
          : b
      )
    } else {
      // ✅ ADD MODE
      newList = [
        ...list,
        {
          ...book,
          id: Date.now(),
          count: Number(book.count) || 1,
          borrowed: 0,
          borrowedBy: []
        }
      ]
    }

    setList(newList)
    localStorage.setItem('Books', JSON.stringify(newList))
    setBook({})
    setCurrentPage(1)
    navigate('/admin/view-books')
  }

  // ================= CRUD =================
  const handleDelete = (id) => {
    const newList = list.filter(b => b.id !== id)
    setList(newList)
    localStorage.setItem('Books', JSON.stringify(newList))
  }

  const handleEdit = (id) => {
    const editData = list.find(b => b.id === id)
    setBook(editData)
    navigate('/admin/add-book')
  }

  // ================= BORROW =================
  const handleBorrowBook = (id) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (!currentUser || !currentUser.id) {
      alert('Login first')
      return
    }

    const newList = list.map(b => {
      if (b.id === id) {
        if (b.borrowedBy.includes(currentUser.id)) {
          alert('You already borrowed this book')
          return b
        }

        if (b.borrowed >= b.count) {
          alert('Out of stock')
          return b
        }

        return {
          ...b,
          borrowed: b.borrowed + 1,
          borrowedBy: [...b.borrowedBy, currentUser.id]
        }
      }
      return b
    })

    setList(newList)
    localStorage.setItem('Books', JSON.stringify(newList))
  }

  // ================= RETURN SINGLE BOOK =================
  const handleReturnBook = (id) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (!currentUser) return

    const newList = list.map(b => {
      if (b.id === id && b.borrowedBy.includes(currentUser.id)) {
        const updatedBorrowedBy = b.borrowedBy.filter(
          uid => uid !== currentUser.id
        )

        return {
          ...b,
          borrowed: Math.max(0, b.borrowed - 1),
          borrowedBy: updatedBorrowedBy
        }
      }
      return b
    })

    setList(newList)
    localStorage.setItem('Books', JSON.stringify(newList))
  }

  // ================= RETURN ALL USER BOOKS =================
  const handleRemoveAllBooks = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (!currentUser) return

    const newList = list.map(b => {
      if (!b.borrowedBy.includes(currentUser.id)) return b

      const updatedBorrowedBy = b.borrowedBy.filter(
        uid => uid !== currentUser.id
      )

      return {
        ...b,
        borrowed: updatedBorrowedBy.length,
        borrowedBy: updatedBorrowedBy
      }
    })

    setList(newList)
    localStorage.setItem('Books', JSON.stringify(newList))
  }

  // ================= EXPORT =================
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
    handleRemoveAllBooks,
    currentItem,
    currentPage,
    totalPage,
    setCurrentPage
  }
}
