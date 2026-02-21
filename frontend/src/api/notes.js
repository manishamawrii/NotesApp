import axios from "axios";

const API = "https://devlog-backend-bb6s.onrender.com/api/notes";

export const getNotes = async (token) => {
  return await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createNote = async (note, token) => {
  return await axios.post(API, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteNote = async (id, token) => {
  return await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateNote = async (id, note, token) => {
  return await axios.put(`${API}/${id}`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


// User enters credentials
//       ↓
// Backend verifies
//       ↓
// JWT created
//       ↓
// Token sent to frontend
//       ↓
// Stored in localStorage

// for notes 
// Browser sends request
//         ↓
// Express receives request
//         ↓
// protect middleware executes
//         ↓
// Token extracted
//         ↓
// jwt.verify() validates
//         ↓
// req.user set
//         ↓
// next() called
//         ↓
// Controller runs
//         ↓
// Database queried
//         ↓
// Response returned
//         ↓
// Frontend updates UI


// he protect middleware ensures:

// The request claims identity (token exists)

// The identity proof is cryptographically authentic (valid signature)

// The proof is still active (not expired)

// The verified identity is attached to the request object


// Promise → resolves → Response Object → contains data
// axios() → Promise → await → response → response.data
// 👉 Axios returns a Promise that resolves to a Response object.
// 👉 The actual backend data is inside response.data.



// Dashboard
//  → fetchNotes()
//  → getNotes()
//  → axios request
//  → backend
//  → database
//  → res.json(array)
//  → axios response.data
//  → setNotes(array)
//  → UI render
