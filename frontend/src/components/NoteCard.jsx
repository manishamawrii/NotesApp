import React from "react";
import { motion } from "framer-motion";

export default function NoteCard({ note, onDelete, darkMode, onEdit }) {
  // 🎨 Color mapping (Tailwind safe)
  const colorClasses = {
    pink: "bg-pink-600 text-white",
    blue: "bg-blue-600 text-white",
    green: "bg-green-600 text-white",
    purple: "bg-purple-600 text-white",
    yellow: "bg-yellow-400 text-gray-900",
  };

  // fallback color if something goes wrong
  const cardColor = colorClasses[note.color] || colorClasses.pink;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-6 rounded-3xl border transition-all duration-300 shadow-xl
        ${cardColor}
      `}
    >
      {/* Title */}
      <h2 className="text-2xl font-bold mb-3 tracking-wide">
        {note.title}
      </h2>

      {/* Content */}
      <p className="mb-6 text-sm leading-relaxed opacity-90">
        {note.content}
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        {/* Edit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(note)}
          className="flex-1 bg-gradient-to-r from-blue-700 to-indigo-900
                     text-white py-2.5 rounded-xl
                     transition duration-300 shadow-lg"
          type="button"
        >
          ✏️ Edit
        </motion.button>

        {/* Delete Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(note._id)}
          className="flex-1 bg-gradient-to-r from-rose-700 to-pink-800
                     text-white py-2.5 rounded-xl
                     transition duration-300 shadow-lg"
        >
          🗑 Delete
        </motion.button>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none
                      bg-gradient-to-br from-white/10 to-transparent" />
    </motion.div>
  );
}