import React, { useEffect, useState } from 'react';
import FunnyAnswerCard from './FunnyAnswerCard';
import './index.css';

function App() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/answers")
      .then(res => res.json())
      .then(data => setAnswers(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className='header'>
      <h1>Funniest Exam Answers Ever! 😂</h1>
      <p className="subtitle">Welcome here!!! When life gives you wrong answers, make memes 🤪.</p>

      <div className="grid-container">
      {answers.map((item) => (
        <FunnyAnswerCard
          key={item._id}
          student={item.student_name}
          subject={item.subject}
          question={item.question}
          answer={item.funny_answer}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
