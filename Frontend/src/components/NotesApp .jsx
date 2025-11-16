import React, { useEffect, useState } from "react";
import axios from "axios";

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Fetch notes from backend (Commented out for now)
  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/api/notes`)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching notes:", error);
  //     });
  // }, []);

  // ✅ Add or Update Note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) {
      setMessage("⚠️ Please fill in both fields.");
      return;
    }

    if (editIndex !== null) {
      // Update existing note
      const updated = [...notes];
      updated[editIndex] = { title, desc };
      setNotes(updated);
      setEditIndex(null);
      setMessage("✅ Note updated successfully!");
    } else {
      // Add new note
      setNotes([...notes, { title, desc }]);
      setMessage("✅ Note added successfully!");
    }

    setTitle("");
    setDesc("");
  };

  // ✅ Edit Note
  const handleEdit = (index) => {
    setTitle(notes[index].title);
    setDesc(notes[index].desc);
    setEditIndex(index);
    setMessage("");
  };

  // ✅ Delete Note
  const handleDelete = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
    setMessage("🗑️ Note deleted.");
  };

  // ✅ Clear All Notes
  const handleClearAll = () => {
    setNotes([]);
    setMessage("🧹 All notes cleared!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-indigo-500 to-blue-600 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full sm:w-[600px]">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 flex justify-between items-center">
          📝 Notes App

          <button className="text-sm bg-red-700 p-1 text-white cursor-pointer" >Logout</button>
        </h1>

        {message && (
          <p className="text-center text-sm mb-3 text-green-600">{message}</p>
        )}

        {/* Add Note Form */}
        <form onSubmit={handleAddNote} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="desc"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Write your note here..."
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {editIndex !== null ? "Update Note" : "Add Note"}
          </button>
        </form>

        {/* Notes List */}
        {notes.length > 0 ? (
          <>
            <div className="mt-6 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Your Notes
              </h2>
              <button
                onClick={handleClearAll}
                className="text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="bg-gray-300 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-bold text-gray-800 wrap-break-word">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 wrap-break-word">
                    {note.desc}
                  </p>

                  <div className="flex justify-end gap-3 mt-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center mt-6">
            No notes yet. Start adding some!
          </p>
        )}
      </div>
    </div>
  );
};

export default NotesApp;
