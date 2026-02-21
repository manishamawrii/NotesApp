import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { getNotes, createNote, deleteNote, updateNote } from "../api/notes";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true); // ✅ simple dark mode
const [editingNote, setEditingNote] = useState(null);
  // 🔹 Fetch Notes
  const fetchNotes = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data } = await getNotes(user);
      setNotes(data);
    } catch (error) {
      toast.error("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // 🔹 Add Note
  const handleAddNote = async (note) => {
    try {
      await createNote(note, user);
      toast.success("Note added 💕");
      fetchNotes();
    } catch (error) {
      toast.error("Failed to add note");
    }
  };

  // 🔹 Delete Note
  const handleDelete = async (id) => {
    try {
      await deleteNote(id, user);
      toast.success("Note deleted 🗑");
      fetchNotes();
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const handleUpdateNote = async(id,updatedNote)=>{
    try {
      await updateNote(id,updatedNote,user);
      toast.success("note updated");
      setEditingNote(null);
      fetchNotes();

    } catch (error) {
      toast.error("failed to update note")
    }
  }
  return (
    <div
      className={`min-h-screen px-4 py-10 transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto">

        {/* 🔥 Dark Mode Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            {darkMode ? "Light Mode ☀" : "Dark Mode 🌙"}
          </button>
        </div>

        {/* 🌸 Heading */}
        <h1
          className={`text-4xl md:text-5xl font-extrabold text-center mb-10 ${
            darkMode ? "text-pink-300" : "text-pink-600"
          }`}
        >
          🌸 My Notes
        </h1>

        {/* ✍️ Note Form */}
        <div className="mb-10">
<NoteForm
  onAdd={handleAddNote}
  onUpdate={handleUpdateNote}
  editingNote={editingNote}
  darkMode={darkMode}
/>        </div>

        {/* 📄 Notes Section */}
        {loading ? (
          <p className="text-center animate-pulse">
            Loading your notes...
          </p>
        ) : notes.length === 0 ? (
          <p className="text-center text-lg">
            No notes yet 💕 Start by adding one!
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={setEditingNote}
                onDelete={handleDelete}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// data = [
//   {
//     _id: "65abc123",
//     title: "First Note",
//     content: "Hello world"
//   },
//   {
//     _id: "65abc456",
//     title: "Second Note",
//     content: "React is awesome"
//   }
// ]fetchNotes()
//    ↓
// getNotes(user)
//    ↓
// axios.get(...)
//    ↓
// Backend
//    ↓
// response
//    ↓
// data
//    ↓
// setNotes(data)



// 1️⃣ Dashboard load hota hai
//         ↓
// 2️⃣ useEffect run hota hai
//         ↓
// 3️⃣ fetchNotes() call hota hai
//         ↓
// 4️⃣ getNotes(user) call hota hai
//         ↓
// 5️⃣ axios.get() backend ko request bhejta hai
//         ↓
// 6️⃣ Express route request receive karta hai
//         ↓
// 7️⃣ Controller MongoDB se notes nikalta hai
//         ↓
// 8️⃣ res.json(notesArray) frontend ko bhejta hai
//         ↓
// 9️⃣ Axios response receive karta hai
//         ↓
// 🔟 const { data } = response
//         ↓
// 1️⃣1️⃣ setNotes(data)
//         ↓
// 1️⃣2️⃣ React re-render karta hai
//         ↓
// 1️⃣3️⃣ notes.map() → NoteCard show hota hai


// 1️⃣ User form fill karta hai (title + content)
//         ↓
// 2️⃣ Submit button click karta hai
//         ↓
// 3️⃣ handleSubmit() run hota hai (NoteForm me)
//         ↓
// 4️⃣ onAdd({ title, content }) call hota hai
//         ↓
// 5️⃣ Ye actually Dashboard ka handleAddNote() hai
//         ↓
// 6️⃣ createNote(note, user) call hota hai
//         ↓
// 7️⃣ axios.post() backend ko request bhejta hai
//         ↓
// 8️⃣ Express route request receive karta hai
//         ↓
// 9️⃣ Controller MongoDB me note save karta hai
//         ↓
// 🔟 res.json(newNote) frontend ko bhejta hai
//         ↓
// 1️⃣1️⃣ Axios response receive karta hai
//         ↓
// 1️⃣2️⃣ fetchNotes() dobara call hota hai
//         ↓
// 1️⃣3️⃣ Backend se updated notes array aata hai
//         ↓
// 1️⃣4️⃣ setNotes(updatedArray)
//         ↓
// 1️⃣5️⃣ React re-render karta hai
//         ↓
// 1️⃣6️⃣ Naya note screen pe dikh jata hai 🎉


// User → Form → Dashboard → Axios → Backend → Database
//        ←--------------------------------------------
//                  New Note Save
//        → fetchNotes() → Updated Array → setNotes()
//        → UI Update
