import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
};

export const createNote = async (req, res) => {
  try {
    const { title, content, color } = req.body;

    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      color: req.body.color || "FORCE_TEST_COLOR"
    });

    return res.status(201).json(note);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });
  if (note.user.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;
    note.color = req.body.color || note.color;  // 👈 ADD THIS LINE

  await note.save();
  res.json(note);
};

export const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });
  if (note.user.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

  await note.deleteOne();
  res.json({ message: "Note deleted" });
};
