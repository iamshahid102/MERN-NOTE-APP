import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const NotesApp = () => {
  const navigate = useNavigate();
  // ✅ State management
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  // Get a cookie
  let token;

  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Fetch Notes from Backend
  const getNotes = () => {
    token = Cookies.get("token");
    axios
      .get(`${API_URL}/api/notes`, {
        headers: {
          "x-auth-token": `${token}`,
        },
      })
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  };

  // ✅ Fetch notes from backend on component mount
  useEffect(() => {
    getNotes();
    return () => {
      getNotes();
    };
  }, []);

  // ✅ Add or Update Note
  const handleAddNote = (e) => {
    e.preventDefault();

    token = Cookies.get("token");

    if (!title.trim() || !desc.trim()) {
      setMessage("⚠️ Please fill in both fields.");
      return;
    }

    if (editId !== null) {
      // Update existing note
      axios
        .put(
          `${API_URL}/api/notes/${editId}`,
          { title, description: desc },
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        )
        .then((response) => {
          getNotes();
          setEditId(null);
          setMessage("✅ Note updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating note:", error);
        });
    } else {
      // Add new note

      axios
        .post(
          `${API_URL}/api/notes`,
          { title: title.trim(), description: desc.trim() },
          {
            headers: {
              "x-auth-token": `${token}`,
            },
          }
        )
        .then((response) => {
          getNotes();
          setMessage("✅ Note added successfully!");
        })
        .catch((error) => {
          console.error("Error adding note:", error);
        });
    }

    setTitle("");
    setDesc("");
  };

  // ✅ Edit Note
  const handleEdit = (id, title, Description) => {
    setTitle(title);
    setDesc(Description);
    setEditId(id);
    setMessage("");
  };

  // ✅ Delete Note
  const handleDelete = (id) => {
    token = Cookies.get("token");

    axios
      .delete(`${API_URL}/api/notes/${id}`, {
        headers: {
          "x-auth-token": `${token}`,
        },
      })
      .then((response) => {
        getNotes();
        setMessage("🗑️ Note deleted.");
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  // ✅ Clear All Notes
  const handleClearAll = () => {
    token = Cookies.get("token");

    axios
      .delete(`${API_URL}/api/notes`, {
        headers: {
          "x-auth-token": `${token}`,
        },
      })
      .then((response) => {
        setMessage("🧹 All notes cleared!");
        getNotes();
      })
      .catch((error) => {
        console.error("Error clearing notes:", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-indigo-500 to-blue-600 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full sm:w-[600px]">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 flex justify-between items-center">
          📝 Notes App
          <button
            className="text-sm bg-red-700 p-1 text-white cursor-pointer"
            onClick={() => {
              Cookies.remove("token");
              // redirect after success
              navigate("/login");
            }}
          >
            Logout
          </button>
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
            className="w-full cursor-pointer bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {editId !== null ? "Update Note" : "Add Note"}
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
                className="text-sm cursor-pointer text-red-500 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-gray-300 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-bold text-gray-800 wrap-break-word">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 wrap-break-word">
                    {note.description}
                  </p>

                  <div className="flex justify-end gap-3 mt-3">
                    <button
                      onClick={() =>
                        handleEdit(note._id, note.title, note.description)
                      }
                      className="text-sm text-blue-600 hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="text-sm text-red-600 hover:underline cursor-pointer"
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
