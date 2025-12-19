import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

export const useBooks = () => {
    const [list, setList] = useState([])
    const [book, setBook] = useState({})
    const [borrow, setBorrow] = useState([])

    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const itemsOfLastIndex = currentPage * itemsPerPage
    const itemsOfFirstIndex = itemsOfLastIndex - itemsPerPage
    const currentItem = list.slice(itemsOfFirstIndex, itemsOfLastIndex)
    const totalPage = Math.ceil(list.length / itemsPerPage)

    // ================= INITIAL LOAD =================
    useEffect(() => {
        const oldList = JSON.parse(localStorage.getItem('Books')) || []
        const oldBorrow = JSON.parse(localStorage.getItem('Borrow')) || []

        // 🔥 FIX OLD / CORRUPTED DATA
        const fixedList = oldList.map(b => ({
            ...b,
            borrowed: Number(b.borrowed) || 0,
            borrowedBy: b.borrowedBy || []
        }))

        setList(fixedList)
        setBorrow(oldBorrow)

        localStorage.setItem('Books', JSON.stringify(fixedList))
    }, [])

    // ================= FORM =================
    const handleChange = (e) => {
        const { name, value } = e.target
        setBook(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let newList = []

        if (book.id) {
            // ✅ EDIT MODE (SAFE MERGE)
            newList = list.map(val =>
                val.id === book.id
                    ? {
                        ...val,
                        ...book,
                        borrowed: Number(val.borrowed) || 0,
                        borrowedBy: val.borrowedBy || []
                    }
                    : val
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
        const newList = list.filter(val => val.id !== id)
        setList(newList)
        localStorage.setItem('Books', JSON.stringify(newList))
    }

    const handleEdit = (id) => {
        const editData = list.find(val => val.id === id)
        if (!editData) return

        setBook(editData)
        navigate('/admin/add-book')
    }

    // ================= BORROW =================
    const handleBorrowBook = (id) => {
        const currentUser = JSON.parse(localStorage.getItem('user'))
        if (!currentUser) return alert('Login first')

        const newList = list.map(b => {
            if (b.id === id) {
                const borrowed = Number(b.borrowed) || 0
                const borrowedBy = b.borrowedBy ? [...b.borrowedBy] : []

                if (borrowedBy.includes(currentUser.id)) {
                    alert('You already borrowed this book')
                    return b
                }

                if (borrowed >= b.count) {
                    alert('Out of Stock')
                    return b
                }

                borrowedBy.push(currentUser.id)

                return {
                    ...b,
                    borrowed: borrowed + 1,
                    borrowedBy
                }
            }
            return b
        })

        setList(newList)
        localStorage.setItem('Books', JSON.stringify(newList))
    }

    const handleReturnBook = (id) => {
        const currentUser = JSON.parse(localStorage.getItem('user'))
        if (!currentUser) return

        const newList = list.map(b => {
            if (b.id === id && b.borrowedBy?.includes(currentUser.id)) {
                const updatedBorrowedBy = b.borrowedBy.filter(uid => uid !== currentUser.id)
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

    const handleRemoveAllBooks = () => {
        const currentUser = JSON.parse(localStorage.getItem('user'))
        if (!currentUser) return

        const newList = list.map(b => {
            if (!b.borrowedBy) return b

            const updatedBorrowedBy = b.borrowedBy.filter(uid => uid !== currentUser.id)
            return {
                ...b,
                borrowed: updatedBorrowedBy.length,
                borrowedBy: updatedBorrowedBy
            }
        })

        setList(newList)
        localStorage.setItem('Books', JSON.stringify(newList))
    }

    return {
        list,
        book,
        borrow,
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
