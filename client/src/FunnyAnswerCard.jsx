import React from 'react';
import './FunnyAnswerCard.css';
const FunnyAnswerCard = ({ student, subject, question, answer }) => {
  return (
    <div className="card">
      <h2 className="name">{student}</h2>
      <p><strong>Subject:</strong> {subject}</p>
      <p><strong>Question:</strong> {question}</p>
      <p className="answer"><strong>Answer:</strong> {answer}</p>
    </div>
  );
};

export default FunnyAnswerCard;
