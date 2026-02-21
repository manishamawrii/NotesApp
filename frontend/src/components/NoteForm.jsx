import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NoteForm({
  onAdd,
  onUpdate,
  editingNote,
  darkMode,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("pink");
  const [focused, setFocused] = useState(false);

  const colors = ["pink", "blue", "green", "purple", "yellow"];

  const colorMap = {
    pink: "from-pink-600 to-rose-600",
    blue: "from-blue-600 to-indigo-600",
    green: "from-emerald-600 to-teal-600",
    purple: "from-purple-600 to-fuchsia-600",
    yellow: "from-yellow-400 to-amber-500",
  };

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setColor(editingNote.color || "pink");
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    if (editingNote) {
      onUpdate(editingNote._id, { title, content, color });
    } else {
      onAdd({ title, content, color });
    }

    setTitle("");
    setContent("");
    setColor("pink");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative p-10 rounded-3xl shadow-2xl backdrop-blur-2xl border transition-all duration-500 ${
        darkMode
          ? "bg-gray-900/70 border-gray-700 text-white"
          : "bg-white/60 border-white/40 text-gray-800"
      }`}
    >
      {/* Gradient Border Glow */}
      <div
        className={`absolute inset-0 rounded-3xl pointer-events-none opacity-20 blur-2xl bg-gradient-to-br ${colorMap[color]}`}
      />

      {/* Header */}
      <h2 className="text-2xl font-bold mb-8 tracking-tight">
        {editingNote ? "✨ Edit Your Note" : "🚀 Create New Note"}
      </h2>

      {/* Title Input */}
      <div className="relative mb-8">
        <input
          type="text"
          value={title}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="peer w-full p-4 rounded-xl bg-transparent border 
                     border-gray-300 dark:border-gray-600
                     focus:outline-none focus:border-pink-400 transition-all duration-300"
        />
        <label
          className={`absolute left-4 transition-all duration-300 pointer-events-none
            ${
              focused || title
                ? `-top-3 text-xs text-pink-500 px-2 ${
                    darkMode ? "bg-gray-900" : "bg-white"
                  }`
                : "top-4 text-gray-400"
            }`}
        >
          Title
        </label>
      </div>

      {/* Content Input */}
      <div className="relative mb-8">
        <textarea
          rows="4"
          value={content}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setContent(e.target.value)}
          required
          className="peer w-full p-4 rounded-xl bg-transparent border
                     border-gray-300 dark:border-gray-600
                     focus:outline-none focus:border-pink-400 transition-all duration-300"
        />
        <label
          className={`absolute left-4 transition-all duration-300 pointer-events-none
            ${
              focused || content
                ? `-top-3 text-xs text-pink-500 px-2 ${
                    darkMode ? "bg-gray-900" : "bg-white"
                  }`
                : "top-4 text-gray-400"
            }`}
        >
          Write your thoughts...
        </label>
      </div>

      {/* Color Picker */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-sm opacity-70">Pick Color:</span>
        {colors.map((c) => (
          <motion.button
            key={c}
            whileTap={{ scale: 0.9 }}
            onClick={() => setColor(c)}
            type="button"
            className={`w-9 h-9 rounded-full bg-gradient-to-br ${colorMap[c]}
              ${
                color === c
                  ? "ring-4 ring-offset-2 ring-pink-400 scale-110"
                  : "opacity-70"
              }
              transition-all duration-300`}
          />
        ))}
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className={`w-full py-4 rounded-xl font-semibold text-white 
          bg-gradient-to-r ${colorMap[color]}
          shadow-xl hover:shadow-2xl transition-all duration-300`}
      >
        {editingNote ? "Update Note ✨" : "Add Note 💕"}
      </motion.button>
    </motion.form>
  );
}