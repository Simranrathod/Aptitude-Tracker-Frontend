import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Src/Adminquestions.css";

export default function Adminquestion() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    codeSnippet: "",
    level: "",
    type: "mcq",
    expectedOutput: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch ALL Questions
  const fetchQuestions = async () => {
    try {
      const res = await axios.get("https://aptitude-tracker-backend1-3.onrender.com/questions/all",
     
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
          },
        }
      );
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // LEVEL CHANGE LOGIC
    if (name === "level") {
      let autoType = form.type;

      if (value === "easy") autoType = "mcq";
      if (value === "hard") autoType = "code";
      // Medium → user manually change karega, isliye autoType change mat karo

      setForm({
        ...form,
        level: value,
        type: autoType,
      });

      return;
    }

    setForm({ ...form, [name]: value });
  };

  // Option Change
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...form.options];
    updatedOptions[index] = value;
    setForm({ ...form, options: updatedOptions });
  };

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `https://aptitude-tracker-backend1-3.onrender.com/questions/update/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
            },
          }
        );
        alert("Question Updated!");
      } else {
        await axios.post(
          "https://aptitude-tracker-backend1-3.onrender.com/questions/add",
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
            },
          }
        );
        alert("Question Added!");
      }

      // RESET FORM
      setForm({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        codeSnippet: "",
        level: "",
        type: "mcq",
        expectedOutput: "",
      });

      setEditingId(null);
      fetchQuestions();
    } catch (err) {
      console.log(err);
      alert("Error saving question");
    }
  };

  // Delete Question
  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    await axios.delete(
      `https://aptitude-tracker-backend1-3.onrender.com/questions/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      }
    );
    fetchQuestions();
  };

  // Edit Question
  const editQuestion = (q) => {
    setForm({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      codeSnippet: q.codeSnippet || "",
      level: q.level,
      type: q.type,
      expectedOutput: q.expectedOutput || "",
    });
    setEditingId(q._id);
  };

  return (
    <div className="admin-container">
      <h1 className="title">
        {editingId ? "Update Question" : "Add New Question"}
      </h1>

      {/* FORM SECTION */}
      <form className="question-form" onSubmit={handleSubmit}>
        {/* LEVEL */}
        <select name="level" value={form.level} onChange={handleChange} required>
          <option value="">Select Level</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* TYPE */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          disabled={form.level === "easy" || form.level === "hard"}
        >
          {form.level === "easy" && <option value="mcq">MCQ</option>}

          {form.level === "medium" && (
            <>
              <option value="mcq">MCQ</option>
              <option value="code">Coding</option>
            </>
          )}

          {form.level === "hard" && <option value="code">Coding</option>}
        </select>

        {/* QUESTION */}
        <textarea
          name="question"
          placeholder="Write question..."
          value={form.question}
          onChange={handleChange}
          required
        ></textarea>

        {/* MCQ FIELDS */}
        {form.type === "mcq" && (
          <>
            <div className="options-grid">
              {form.options.map((opt, i) => (
                <input
                  key={i}
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  required
                />
              ))}
            </div>

            <input
              name="correctAnswer"
              placeholder="Correct Answer"
              value={form.correctAnswer}
              onChange={handleChange}
              required
            />
          </>
        )}

        {/* CODE SNIPPET */}
        {form.type === "code" && (
          <>
            <textarea
              name="codeSnippet"
              placeholder="Write code snippet..."
              value={form.codeSnippet}
              onChange={handleChange}
              className="code-input"
              required
            ></textarea>

            <input
              name="expectedOutput"
              placeholder="Expected output here..."
              value={form.expectedOutput}
              onChange={handleChange}
              className="output-input"
              required
            />
          </>
        )}

        <button type="submit" className="submit-btn">
          {editingId ? "Update" : "Add Question"}
        </button>
      </form>

      <hr />

      {/* TABLE SECTION */}
      <h2 className="subtitle">All Questions</h2>

      <div className="table-container">
        <table className="question-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Level</th>
              <th>Type</th>
              <th>Correct</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {questions.length === 0 ? (
              <tr>
                <td colSpan="5">No questions added yet.</td>
              </tr>
            ) : (
              questions.map((q) => (
                <tr key={q._id}>
                  <td>{q.question}</td>
                  <td>{q.level}</td>
                  <td>{q.type}</td>
                  <td>
                    {q.type === "mcq" ? q.correctAnswer : q.expectedOutput || "-"}
                  </td>

                  <td>
                    <div className="action-buttons">


                      <button className="edit-btn" onClick={() => editQuestion(q)}>
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteQuestion(q._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
