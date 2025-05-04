import React, { useState } from 'react';
import './FunnyAnswerCard.css';

const FunnyAnswerCard = ({ id, student, subject, question, answer, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(student);
  const [editedSubject, setEditedSubject] = useState(subject);
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  const handleUpdate = async () => {
    const updatedAnswer = {
      student_name: editedStudent,
      subject: editedSubject,
      question: editedQuestion,
      funny_answer: editedAnswer,
    };

    try {
      const response = await fetch(`http://localhost:3000/answers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAnswer),
      });

      if (response.ok) {
        const updated = await response.json();
        onUpdate(id, updated); 
        setIsEditing(false);
        alert('Entity updated successfully!');
      } else {
        console.error('Failed to update.');
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this answer?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/answers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(id); 
        alert('Entity deleted successfully!');
      } else {
        console.error('Failed to delete.');
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedStudent}
            onChange={(e) => setEditedStudent(e.target.value)}
          />
          <input
            type="text"
            value={editedSubject}
            onChange={(e) => setEditedSubject(e.target.value)}
          />
          <input
            type="text"
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
          />
          <input
            type="text"
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2 className="name">{student}</h2>
          <p><strong>Subject:</strong> {subject}</p>
          <p><strong>Question:</strong> {question}</p>
          <p className="answer"><strong>Answer:</strong> {answer}</p>
          <div className="card-buttons">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default FunnyAnswerCard;
