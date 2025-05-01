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

  return (
    <div className='header'>
      <h1>Funniest Exam Answers Ever! 😂</h1>
      <p className="subtitle">Welcome here!!! When life gives you wrong answers, make memes 🤪.</p>

      <AddAnswerForm onAdd={handleAddAnswer} />

      <div className="grid-container">
        {answers.map((item) => (
          <div className="grid-item" key={item._id}>
            <FunnyAnswerCard
              student={item.student_name}
              subject={item.subject}
              question={item.question}
              answer={item.funny_answer}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
