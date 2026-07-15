import {Routes, Route} from "react-router"
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App(){
  return(
    <>
      <div className="container">
         <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/home" element={<Home/>} />
         </Routes>
      </div>
    </>
  )
}