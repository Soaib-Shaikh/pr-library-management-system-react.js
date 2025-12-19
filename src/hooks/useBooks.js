import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

export const useBooks = () => {
    const [list, setList] = useState([])
    const [book, setBook] = useState({})
    const [borrow, setBorrow] = useState([])
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    let itemsPerPage = 5;

    let itemsOfLastIndex = currentPage * itemsPerPage;
    let itesOfFirstIindex = itemsOfLastIndex - itemsPerPage;
    let currentItem = list.slice(itesOfFirstIindex, itemsOfLastIndex);
    let totalPage = Math.ceil(list.length / itemsPerPage)

    useEffect(() => {
        const oldList = JSON.parse(localStorage.getItem('Books')) || []
        const oldBorrow = JSON.parse(localStorage.getItem('Borrow')) || []
        setList(oldList)
        setBorrow(oldBorrow)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setBook({ ...book, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let newList = []

        if (book.id) {
            newList = list.map((val) => (val.id == book.id ? book : val))
        } else {
            newList = [...list, { ...book, id: Date.now(), count: book.count || 1 }]
        }

        setList(newList)
        localStorage.setItem('Books', JSON.stringify(newList))
        setCurrentPage(1);
        setBook({})
        navigate('/admin/view-books')
    }

    const handleDelete = (id) => {
        const newList = list.filter((val) => val.id != id)
        setList(newList)
        localStorage.setItem('Books', JSON.stringify(newList))
    }

    const handleEdit = (id) => {
        const editData = list.find((val) => val.id == id)
        setBook(editData)
        navigate('/admin/add-book')
    }

    // Borrow a book
    const handleBorrowBook = (id) => {
        const currentUser = JSON.parse(localStorage.getItem('user')); // logged in user
        if (!currentUser) return alert('Login first');

        const newList = list.map(b => {
            if (b.id === id) {
                let borrowedBy = b.borrowedBy ? [...b.borrowedBy] : [];

                // Check if user already borrowed this book
                if (borrowedBy.includes(currentUser.id)) {
                    alert('You have already borrowed this book');
                    return b; // return unchanged
                }

                if (b.borrowed >= b.count) {
                    alert('Out of Stock');
                    return b;
                }

                borrowedBy.push(currentUser.id); // add user to borrowedBy
                return { ...b, borrowed: b.borrowed + 1, borrowedBy };
            }
            return b;
        });

        setList(newList);
        localStorage.setItem('Books', JSON.stringify(newList));
    }



    const handleReturnBook = (id) => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const newList = list.map(b => {
            if (b.id === id && b.borrowedBy?.includes(currentUser.id)) {
                const updatedBorrowedBy = b.borrowedBy.filter(uid => uid !== currentUser.id);
                return { ...b, borrowed: b.borrowed - 1, borrowedBy: updatedBorrowedBy };
            }
            return b;
        });

        setList(newList);
        localStorage.setItem('Books', JSON.stringify(newList));
    };


    const handleRemoveAllBooks = () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const newList = list.map(b => {
            if (!b.borrowedBy) return b;
            const updatedBorrowedBy = b.borrowedBy.filter(uid => uid !== currentUser.id);
            return { ...b, borrowed: updatedBorrowedBy.length, borrowedBy: updatedBorrowedBy };
        });

        setList(newList);
        localStorage.setItem('Books', JSON.stringify(newList));
    };


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
        setCurrentPage,
    }
}
