import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  const {dispatch}= useAuth();

  const [email,setemail]= useState("");
  const[password , setPassword]= useState("");


  const handleSubmit= async(e)=>{
e.preventDefault();
  

  try {
    const {data} = await axios.post("https://devlog-backend-bb6s.onrender.com/api/users/login", {email,password})
console.log("LOGIN RESPONSE:", data);   // 👈 YAHAN


    localStorage.setItem("token", data.token)
console.log("TOKEN STORED:", data.token);  // 👈 YAHAN

    dispatch({type:"LOGIN" , payload: data.token})
    
    alert("login successful!");
    navigate("/dashboard")
  } catch (error) {
    alert(error.response?.data?.message|| "login failed")
  }
}
  return (
    <div className='flex items-center min-h-screen justify-center h-screen  bg-gradient-to-br from-pink-400 to-gray-50'>
      <form action="" onSubmit={handleSubmit} className='bg-white p-6 rounded-xl shadow-md w-96 space-y-4' >
        <h2 className='text-3xl font-semibold mb-7 text-center'>
          Login
        </h2>

        <input type="email" name="" id=""  placeholder='Email'  
        value={email}
        className='w-full p-2 border border-pink-300 mb-7 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200'
        onChange={(e)=>setemail(e.target.value)}  
        />

        <input type="password" name="" id="" placeholder='password'
        value={password}
        className='w-full p-2 border border-pink-300 mb-7 rounded-3xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-200'
        onChange={(e)=>setPassword(e.target.value)}
        />
      


<button type="submit" className='w-full bg-pink-600 text-white p-2 rounded-3xl hover:bg-pink-700 active:scale-95 transition duration-200 font-medium'>login</button>

           <p className='text-sm text-center mt-4'>
                    Don't have an account?{" "}
<span             className="text-pink-600 cursor-pointer"
onClick={()=>navigate("/register")}

>Register</span>
        </p>

      </form>
      </div>
  )
}



// Since you're using:

// dispatch({ type: "LOGIN", payload: token });


// That token is:
// 👉 Proof that user is authenticated
// 👉 Used in protect middleware
// 👉 Used to identify logged-in user


// 🧍 User Login

// ⬇
// Backend verify
// ⬇
// Token milta hai
// ⬇
// Token localStorage me save
// ⬇
// dispatch LOGIN
// ⬇
// state.user = token
// ⬇
// App logged in

// 🔄 Page Refresh

// ⬇
// state.user = null (initially)
// ⬇
// useEffect run
// ⬇
// localStorage check
// ⬇
// token mila
// ⬇
// dispatch LOGIN
// ⬇
// state.user = token
// ⬇
// User still logged in


//  When backend creates token, it doesn’t just write:

// {id: 123}


// It also adds a signature.



// STEP 1: User Enters Login Details

// User types:

// Email
// Password


// Frontend sends this to backend.

// 🔹 STEP 2: Backend Checks Database

// Backend checks:

// Does this email exist?

// Is password correct?

// If wrong → Stop here ❌
// If correct → Go to Step 3 ✅

// 🔹 STEP 3: Backend Creates Token

// Backend creates token using:

// jwt.sign({ id: user._id }, SECRET)


// Token contains:

// user id

// expiry time

// signature (security proof)

// 🔹 STEP 4: Backend Sends Token to Frontend

// Backend sends:

// {
//   "token": "longRandomStringHere"
// }

// 🔹 STEP 5: Frontend Stores Token

// Frontend saves token:

// localStorage.setItem("token", token)


// Now user is logged in.

// 🔹 STEP 6: User Requests Protected Data

// Example:

// GET /notes


// Frontend sends token with request:

// Authorization: Bearer TOKEN

// 🔹 STEP 7: Backend Extracts Token
// const token = req.headers.authorization.split(" ")[1];


// Now backend has the token.

// 🔹 STEP 8: Backend Verifies Token
// jwt.verify(token, SECRET)


// Backend checks:

// Was this created using my secret?

// Is it expired?

// Is it modified?

// If invalid → reject ❌
// If valid → continue ✅

// 🔹 STEP 9: Backend Gets User From Database
// User.findById(decoded.id)


// Now backend knows which user is making request.

// 🔹 STEP 10: Backend Sends Requested Data

// Example:

// Note.find({ user: req.user._id })


// User gets their own data.

// 🎯 Final Summary in One Line

// Login → Get Token → Send Token → Verify Token → Access Allowed

// If you want, next I can give:

// Only login flow steps

// Only token verification steps

// Or diagram-style explanation

// Tell me which one.
// So yes 👉 signature is generated using the secret key.

// (header + payload + secret)



// jwt.sign({ id: "123" }, "mySecretKey")
// HEADER.PAYLOAD.SIGNATURE
// 1️⃣ Header

// Tells:

// Algorithm used (HS256)

// Type = JWT
// 2️⃣ Payload

// What you passed:

// { id: "123" }
// Signature

// Created using:

// header + payload + secret

