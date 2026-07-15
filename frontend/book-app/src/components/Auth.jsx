import axios from 'axios';
import React, { useState } from 'react'
import './Auth.css';
import { useNavigate } from 'react-router';
const Auth = () => {
    const [user, setuser] = useState({
        name:"",
        email:"",
        password:""
    });
    const [signin, setsignin] = useState({
        email: "",
        password: ""
    });
    const getName = (e) => setuser({ ...user, name: e.target.value });
    const getEmail = (e) => setuser({ ...user, email: e.target.value });
    const getPassword = (e) => setuser({ ...user, password: e.target.value });
    const navigate = useNavigate();
    // ===>
    const [isignin, setissignin] = useState(true);
    
    //signin================

    const checkEmail = (e) => setsignin({ ...signin, email: e.target.value })
    const checkPassword = (e) => setsignin({ ...signin, password: e.target.value })


    const clear = () => {
            setuser({ name: "", email: "", password: "" })
            setsignin({ email: "", password: "" });
    }
    const switchform =(status)=>{
        clear();
        setissignin(status);
    }
    const handlePostUser = async () => {
        const res = await axios.post("http://localhost:5000/api/book/signup", user);
        if (res.data.status) {
            alert(res.data.message);
            clear();
            setissignin(false)

        }
        else {
            alert(res.data.message);
        }
    }

    const checkUser = async () => {
        const res = await axios.post("http://localhost:5000/api/book/signin", signin,{
            withCredentials:true
        });
        if (res.data.status) {
            alert(res.data.message)
            clear();//clear function hai jo maine bnaaya hai 
            navigate("/home")

        }
        else {
            alert(res.data.message)
        }

    }

    return (
        <div className='container'>
            <h1 className='text-white'>{isignin ? "Sign Up" : "Sign In"}</h1>
            {
                isignin ? (<div>
                    <div>
                        <input className='mt-0' type="text"value={user.name} onChange={getName} placeholder='name' />
                    </div>
                    <div>
                        <input className='mt-0' type="text"value={user.email} onChange={getEmail} placeholder='email' />
                    </div>
                    <div>
                        <input className='mt-0' type="text"value={user.password  } onChange={getPassword} placeholder='password' />
                    </div>
                    <div>
                        <button onClick={() => {
                            handlePostUser()
                        }}>Add</button>
                    </div>
                </div>) : (<div>
                    <div>
                        <input value={signin.email} type="email" onChange={checkEmail} placeholder='email' />
                    </div>
                    <div>
                        <input type="password" value={signin.password} onChange={checkPassword} placeholder='password' />
                    </div>
                    <div>
                    </div>
                    <div>
                        <button onClick={() => {
                            checkUser();
                        }}>Add</button>
                    </div>
                   
                </div>)
                
            }

            <div style={{ marginTop: "20px" }}>
                 {
                    isignin?(<button onClick={()=>switchform(false)}>Already Register? Go to Sign In</button>)
                    :(<button onClick={()=>switchform(true)}>New User? Go to Sign Un</button>)

                 }
            </div>



        </div>
    )
}

export default Auth