import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router'
const Home = () => {
    const [books, setBooks] = useState([]);
    const [book, setbook] = useState({
        title: "",
        auther: "",
        price: "",
        cartogary: "",
        publishYear: ""
    });
    const navigate = useNavigate();
    const handleFilled = (x) => setbook(x)//isliye bnaya ki jab bhi user edit pr click krega to vo data input filed me aa jaayega.

    const handleFetchBook = async () => {
        const res = await axios.get("http://localhost:5000/api/book", {
            withCredentials: true
        });
        console.log("Response:", res.data);
        console.log("Data:", res.data);
        setBooks(res.data.data);
    }

    const handlePostBook = async () => {
        const res = await axios.post("http://localhost:5000/api/book", book,
            {
                withCredentials: true
            });
        if (res.status == 201) {
            alert(res.data.message);
            handleFetchBook(); // refresh ke liye

            setbook({ title: "", auther: "", price: "", cartogary: "", publishYear: "", image: "" });

        }
        else {
            alert(res.data.err);
            console.log(res.data.message);
        }
        console.log(res.data)
    }

    const deleteBook = async (id) => {
        const res = await axios.delete("http://localhost:5000/api/book?id=" + id,
            {
                withCredentials: true
            });
        handleFetchBook();
    }

    const handleUpdate = async () => {
        if (!book._id) {
            alert("please click edit button in any book !!");
            return;
        }
        const res = await axios.put("http://localhost:5000/api/book", book,
            {
                withCredentials: true
            });
        alert("book updated successfully !! ");
        handleFetchBook();
        setbook({ title: "", auther: "", price: "", cartogary: "", publishYear: "", image: "" });

    };
    useEffect(() => {
        handleFetchBook();
    }, [])
    return (


        <div className='container d-flex flex-column align-items-center justify-content-center '>

            <h1 className="heading">📚 Book Management</h1>
            <p className="sub-heading">
                Add, Update and Manage Your Books
            </p>
            <div  className='d-flex flex-column gap-1'>
                <div>
                    <input type="text" value={book.title} placeholder='title' onChange={(e) => setbook({ ...book, title: e.target.value })} />
                </div>
                <div>
                    <input type="text" value={book.image} placeholder='image(URL)' onChange={(e) => setbook({ ...book, image: e.target.value })} />
                </div>
                <div>
                    <input type="text" value={book.auther} placeholder='auther' onChange={(e) => setbook({ ...book, auther: e.target.value })} />
                </div>
                <div>
                    <input type="text" value={book.price} placeholder='price' onChange={(e) => setbook({ ...book, price: e.target.value })} />
                </div>
                <div>
                    <input type="text" value={book.cartogary} placeholder='cartogary' onChange={(e) => setbook({ ...book, cartogary: e.target.value })} />
                </div>
                <div>
                    <input type="text" value={book.publishYear} placeholder='publishYear' onChange={(e) => setbook({ ...book, publishYear: e.target.value })} />
                </div>
                <div>
                    <button onClick={handlePostBook}>Add</button>
                    <button onClick={() => {
                        handleUpdate()
                    }}>update</button>

                </div>
            </div>

            <div className='book-box'>
                {
                    books?.map((book, i) => (
                        <div className='book' key={i}>
                            <img src={book.image} alt="" />
                            <p>{book.title || "Not Title provide"}</p>
                            <p>{book.author || "Not author provide"}</p>
                            <p>{book.price || "Not price provide"}</p>
                            <button onClick={() => {
                                deleteBook(book._id);
                            }}>remove</button>
                            <button className='' onClick={() => {
                                handleFilled(book)
                            }}>
                                edit
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home