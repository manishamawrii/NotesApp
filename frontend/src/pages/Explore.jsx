import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Explore() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchPublicNotes = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/notes/public"
        );
        setNotes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPublicNotes();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">
        🌍 Public Notes
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div key={note._id} className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-2 text-pink-600">
              {note.title}
            </h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
