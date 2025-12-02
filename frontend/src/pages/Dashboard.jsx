import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../services/api.js";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard()
{
  const { user, setUser, setToken, token } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questionError, setQuestionError] = useState("");
  const [QuestionInput, setQuestionInput] = useState({ title: "", body: "" });
  const navigate = useNavigate();
  function handleLogout()
  {
    setUser(null);
    setToken("");
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() =>
  {
    async function loadCats()
    {
      try
      {
        const res = await api.get("/categories");
        setCategories(res.data);
      }
      catch (errors)
      {
        console.error(errors);
      }
    }
    loadCats();
  }, []);
  useEffect(() =>
  {
    if (!selectedCategory)
    {
        return;
    }
    async function loadQuestions()
    {
      setLoadingQuestions(true);
      setQuestionError("");
      try
      {
        const res = await api.get(`/questions/${selectedCategory._id}`);
        setQuestions(res.data);
      }
      catch (errors)
      {
        console.error(errors);
        setQuestionError("Failed to load questions.");
      }
      finally
      {
        setLoadingQuestions(false);
      }
    }
    loadQuestions();
  }, [selectedCategory]);

  function handleSelectCategory(category)
  {
    setSelectedCategory(category);
    setQuestions([]);
    setQuestionInput({ title: "", body: "" });
  }

  async function handleSelectQuestion(question)
  {
    setSelectedQuestion(question);
    setAnswers([]);
    setNewAnswer("");
    try
    {
      const res = await api.get(`/answers/${question._id}`);
      setAnswers(res.data);
    }
    catch (errors)
    {
      console.error(errors);
    }
  }

  async function handleAnswerSubmit(e)
  {
    e.preventDefault();
    if (!newAnswer.trim()) 
    {
      return;
    }
    try
    {
      const res = await api.post("/answers",
        {
          question: selectedQuestion._id,
          body: newAnswer,
        },
        {
          headers:
          {
            Authorization: `Bearer ${token}`
          },
        }
      );
      setAnswers((prev) => [res.data, ...prev]);
      setNewAnswer("");
    }
    catch (errors)
    {
      console.error(errors);
    }
  }

  function handleQuestionChange(e)
  {
    const { name, value } = e.target;
    setQuestionInput((prev) => ({ ...prev, [name]: value }));
    setQuestionError("");
  }

  async function handleQuestionSubmit(e)
  {
    e.preventDefault();
    if (!selectedCategory)
    {
        return;
    }
    if (!QuestionInput.title.trim() || !QuestionInput.body.trim())
    {
      setQuestionError("Title and body are required.");
      return;
    }
    try
    {
      const res = await api.post("/questions",
        {
          category: selectedCategory._id,
          title: QuestionInput.title,
          body: QuestionInput.body,
        },
        {
          headers:
          {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestions((prev) => [res.data, ...prev]);
      setQuestionInput({ title: "", body: "" });
    }
    catch (errors)
    {
      console.error(errors);
      setQuestionError("Failed to post question.");
    }
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>TechTalk Hub</h1>
        <div className="user-box">
          <span>Welcome, {user?.username}</span>
          <a className="logout-link" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
      <div className="dashboard-body">
        <div className="sidebar">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="category-item"
              onClick={() => handleSelectCategory(cat)}
            >
              {cat.name}
            </div>
          ))}
        </div>
        <div className="content-area">
          {!selectedCategory && (
            <p className="default-message">
              Select a Category to view its questions.
            </p>
          )}
          {selectedCategory && !selectedQuestion && (
            <>
              <h2>{selectedCategory.name}</h2>
              <form onSubmit={handleQuestionSubmit} className="question-form">
                <input
                  type="text"
                  name="title"
                  placeholder="Question title"
                  value={QuestionInput.title}
                  onChange={handleQuestionChange}
                />
                <textarea
                  name="body"
                  placeholder="Describe your question..."
                  rows="3"
                  value={QuestionInput.body}
                  onChange={handleQuestionChange}
                />
                {questionError && <p className="error">{questionError}</p>}
                <button type="submit">Ask Question</button>
              </form>
              <div className="questions-list">
                {loadingQuestions && <p>Loading questions...</p>}
                {!loadingQuestions && questions.length === 0 && (
                  <p>No questions yet in this category.</p>
                )}
                {questions.map((q) => (
                  <div
                    key={q._id}
                    className="question-item clickable"
                    onClick={() => handleSelectQuestion(q)}
                  >
                    <h3>{q.title}</h3>
                    <p>{q.body}</p>
                    <small>By: {q.user?.username}</small>
                  </div>
                ))}
              </div>
            </>
          )}
          {selectedQuestion && (
              <>
                <button className="back-btn" onClick={() => setSelectedQuestion(null)}>
                  Back to Questions
                </button>
                <div className="question-view">
                  <h2>{selectedQuestion.title}</h2>
                  <p>{selectedQuestion.body}</p>
                  <small>Asked by: {selectedQuestion.user?.username}</small>
                </div>
                <form onSubmit={handleAnswerSubmit} className="answer-form">
                  <textarea
                    placeholder="Write your answer..."
                    rows="3"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                  />
                  <button type="submit">Post Answer</button>
                </form>
                <div className="answers-list">
                  {answers.length === 0 && <p>No answers yet.</p>}
                  {answers.map((a) => (
                    <div key={a._id} className="answer-item">
                      <p>{a.body}</p>
                      <small>By: {a.user?.username}</small>
                    </div>
                  ))}
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
