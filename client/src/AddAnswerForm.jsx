import React, { useState } from 'react';
import './AddAnswerForm.css';

function AddAnswerForm({ onAdd }) {
  const [student, setStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [funnyAnswer, setFunnyAnswer] = useState('');
  const [createdBy, setCreatedBy] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAnswer = {
      student_name: student,
      subject: subject,
      question: question,
      funny_answer: funnyAnswer,
      uploaded_by: "Admin", 
      created_by: createdBy || "Anonymous" 
    };

    try {
      const response = await fetch('http://localhost:3000/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnswer),
      });

      if (response.ok) {
        const savedAnswer = await response.json();
        onAdd(savedAnswer); 
 
        setStudent('');
        setSubject('');
        setQuestion('');
        setFunnyAnswer('');
        setCreatedBy('');
      } else {
        console.error('Failed to add new answer.');
      }
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-answer-form">
      <input
        type="text"
        value={student}
        onChange={(e) => setStudent(e.target.value)}
        placeholder="Student Name"
        required
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        required
      />
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question"
        required
      />
      <input
        type="text"
        value={funnyAnswer}
        onChange={(e) => setFunnyAnswer(e.target.value)}
        placeholder="Funny Answer"
        required
      />

      <input
        type="text"
        value={createdBy}
        onChange={(e) => setCreatedBy(e.target.value)}
        placeholder="Created By (Your Name)"
        required
      />

      <button type="submit">Add Answer</button>
    </form>
  );
}

export default AddAnswerForm;
