import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
const Home = () => {
    const [books,setBooks]=useState([]);
    const [book, setbook] = useState({
        title: "",
        auther: "",
        price: "",
        cartogary: "",
        publishYear: ""
    });

    const handleFetchBook = async () => {
        const res = await axios.get("http://localhost:5000/api/book");
        console.log(res.data);
    }

    const handlePostBook = async () => {
        const res = await axios.post("http://localhost:5000/api/book", book);
        if (res.status == 201) {
            alert(res.data.message);
        }
        else {
            alert(res.data.err.message);
        }
        console.log(res.data)
    }

    const deleteBook = async (id)=>{
        const res = await axios.delete("http://localhost:5000/api/book/"+book.id);

    }
    useEffect(() => {
        handleFetchBook();
    }, [])
    return (
        <div className='container d-flex flex-column align-items-center justify-content-center '>
            <div style={{ height: "100vh" }}  >
                <div>
                    <input type="text" value={book.title} placeholder='title' onChange={(e) => setbook({ ...book, title: e.target.value })} />
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
                </div>
            </div>

            <div className='bg-dark'>
                {
                    books.map((book, i) => (
                        <div key={i}>
                            <p>{book.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home