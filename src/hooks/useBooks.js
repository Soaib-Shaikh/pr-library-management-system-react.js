import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

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

  useEffect(() => {
    const oldList = JSON.parse(localStorage.getItem('Books')) || []

    const fixedList = oldList.map(b => {
      const borrowedBy = Array.isArray(b.borrowedBy) ? b.borrowedBy : []
      return {
        ...b,
        count: Number(b.count) || 0,
        borrowedBy,
        borrowed: borrowedBy.length 
      }
    })

    setList(fixedList)
    localStorage.setItem('Books', JSON.stringify(fixedList))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setBook(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let newList
    if (book.id) {
      newList = list.map(b =>
        b.id === book.id
          ? { ...b, ...book }
          : b
      )
    } else {
      newList = [
        ...list,
        {
          ...book,
          id: Date.now(),
          count: Number(book.count) || 1,
          borrowedBy: [],
          borrowed: 0
        }
      ]
    }

    setList(newList)
    localStorage.setItem('Books', JSON.stringify(newList))
    setBook({})
    setCurrentPage(1)
    navigate('/admin/view-books')
  }

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

  const handleBorrowBook = (id) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (!currentUser?.id) {
      alert('Login first')
      return
    }

    const newList = list.map(b => {
      if (b.id === id) {
        if (b.borrowedBy.includes(currentUser.id)) {
          alert('You already borrowed this book')
          return b
        }

        if (b.borrowedBy.length >= b.count) {
          alert('Out of stock')
          return b
        }

        const updatedBorrowedBy = [...b.borrowedBy, currentUser.id]

        return {
          ...b,
          borrowedBy: updatedBorrowedBy,
          borrowed: updatedBorrowedBy.length 
        }
      }
      return b
    })

    setList(newList)
    localStorage.setItem('Books', JSON.stringify(newList))
  }

  const handleReturnBook = (id) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (!currentUser?.id) return

    const newList = list.map(b => {
      if (b.id === id && b.borrowedBy.includes(currentUser.id)) {
        const updatedBorrowedBy = b.borrowedBy.filter(
          uid => uid !== currentUser.id
        )

        return {
          ...b,
          borrowedBy: updatedBorrowedBy,
          borrowed: updatedBorrowedBy.length 
        }
      }
      return b
    })

    setList(newList)
    localStorage.setItem('Books', JSON.stringify(newList))
  }

  const handleRemoveAllBooks = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (!currentUser?.id) return

    const newList = list.map(b => {
      if (!b.borrowedBy.includes(currentUser.id)) return b

      const updatedBorrowedBy = b.borrowedBy.filter(
        uid => uid !== currentUser.id
      )

      return {
        ...b,
        borrowedBy: updatedBorrowedBy,
        borrowed: updatedBorrowedBy.length 
      }
    })

    setList(newList)
    localStorage.setItem('Books', JSON.stringify(newList))
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
    handleRemoveAllBooks,
    currentItem,
    currentPage,
    totalPage,
    setCurrentPage
  }
}
