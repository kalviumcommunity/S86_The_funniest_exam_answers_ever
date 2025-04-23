import FunnyAnswerCard from './FunnyAnswerCard';
import examAnswers from './dummyData';
import "./index.css"

function App() {
  return (
    <div className='header'>
      <h1>Funniest Exam Answers Ever !😂</h1>
      <p className="subtitle">Welcome here!!! When life gives you wrong answers, make memes🤪.</p>

      {examAnswers.map((item) => (
  <FunnyAnswerCard
    key={item.id}
    student={item.student}
    subject={item.subject}
    question={item.question}
    answer={item.answer}
  />
))}

    </div>
  );
}

export default App;
