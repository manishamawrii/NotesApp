import React, { useState } from 'react'
import axios from "axios";
import { useNavigation ,useNavigate} from 'react-router-dom';
export default function Register() {
  const navigate = useNavigate();

  const [name,setName]= useState("");
  const [email, setemail]= useState("");
  const [password, setPassword]= useState("")
const handleSubmit=async(e)=>{
  e.preventDefault();

  try {

     await axios.post( "https://devlog-backend-bb6s.onrender.com/api/users/register",{email,password,name})
alert("registeration successfull");

navigate("/");
    
  } catch (error) {

       alert(error.response?.data?.message || "Registration failed");

    
  }
}
  return (
    <div className='flex items-center justify-center h-screen bg-pink-100'>

      <form action="" onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-md w-96'>
      
        <h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>

        <input type="text"  placeholder='Name' className='w-full p-2 border mb-3 rounded-3xl'
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

        <input type="email" name="" id=""
        placeholder="email"
          className="w-full p-2 border mb-3 rounded-3xl"
        value={email} 
        onChange={(e)=>setemail(e.target.value)}/>

         <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3 rounded-3xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button className='w-full bg-pink-600 text-white p-2 rounded-3xl hover:bg-pink-700'>
Register
        </button>

        <p className='text-sm text-center mt-4'>
                    Already have an account?{" "}
<span             className="text-pink-600 cursor-pointer"
onClick={()=>navigate("/")}

>Login</span>
        </p>
      </form>
    
    
    </div>

    
  )
}
