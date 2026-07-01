import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
const Auth = () => {
    const [user, setuser]= useState({});
    const [signin, setsignin] = useState({});
    const getName = (e)=> setuser({...user ,name:e.target.value});
    const getEmail = (e)=> setuser({...user ,email:e.target.value});
    const getPassword = (e)=> setuser({...user ,password:e.target.value});
    const navigate = useNavigate();    
    //signin================

    const checkEmail = (e)=>setsignin({...signin, email:e.target.value})
    const checkPassword = (e)=>setsignin({...signin, password:e.target.value})


const clear = ()=>{
    setuser({name:"",email:"",password:""})
}
    const handlePostUser = async()=>{
        const res = await axios.post("http://localhost:5000/api/book/signup",user);
        if(res.data.status){
                    clear();
            alert(res.data.message);
            
        }
        else{
            alert(res.data.message);
        }
    }

    const checkUser = async()=>{
        const res = await axios.post("http://localhost:5000/api/book/signin",signin);
        if(res.data.status){
            alert(res.data.message)
            navigate("/home")

        }
        else(
            alert(res.data.message)
        )
    }

  return (
    <div>
        <div>
            <div>
            <input type="text" onChange={getName} placeholder='name' />
            </div>
            <div>
            <input type="text" onChange={getEmail} placeholder='email' />
            </div>
            <div>
            <input type="text" onChange={getPassword} placeholder='password' />
            </div>
            <div>
                <button onClick={()=>{
                    handlePostUser()
                }}>Add</button>
            </div>
            <p>signIn</p>
        </div>


        <div>
            <div>
            <input type="email" onChange={checkEmail} placeholder='email' />
            </div>
            <div>
            <input type="password" onChange={checkPassword} placeholder='password' />
            </div>
            <div>
            </div>
            <div>
                <button onClick={()=>{
                    checkUser();
                }}>Add</button>
            </div>
            <p></p>
        </div>
    </div>
  )
}

export default Auth