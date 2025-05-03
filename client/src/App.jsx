import React, { useEffect, useState } from 'react';
import FunnyAnswerCard from './FunnyAnswerCard';
import AddAnswerForm from './AddAnswerForm'; 
import './index.css';

function App() {
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = () => {
    fetch('http://localhost:3000/answers')
      .then(res => res.json())
      .then(data => setAnswers(data))
      .catch(err => console.error('Error fetching data:', err));
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  const handleAddAnswer = (newAnswer) => {
    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/answers/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAnswers(prev => prev.filter(answer => answer._id !== id));
        alert("Deleted successfully!");
      } else {
        console.error("Failed to delete.");
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/answers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedAnswer = await response.json();
        setAnswers(prev => prev.map(ans => ans._id === id ? updatedAnswer : ans));
        alert("Updated successfully!");
      } else {
        console.error("Failed to update.");
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  return (
    <div className='header'>
      <h1>Funniest Exam Answers Ever! 😂</h1>
      <p className="subtitle">Welcome here!!! When life gives you wrong answers, make memes 🤪.</p>

      <AddAnswerForm onAdd={handleAddAnswer} />

      <div className="grid-container">
        {answers.map((item) => (
          <div className="grid-item" key={item._id}>
            <FunnyAnswerCard
              id={item._id}
              student={item.student_name}
              subject={item.subject}
              question={item.question}
              answer={item.funny_answer}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
