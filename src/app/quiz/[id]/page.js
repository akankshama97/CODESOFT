'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Dummy data: Agar localStorage mein kuch na mile toh yeh dikhega
const defaultQuestions = [
  {
    id: 1,
    question: "Next.js mein client-side component banane ke liye kya likhte hain?",
    options: ["'use server'", "'use client'", "'use react'", "Iski zaroorat nahi hai"],
    answer: "'use client'"
  },
  {
    id: 2,
    question: "React mein state management ke liye basic hook kaunsa hai?",
    options: ["useEffect", "useReducer", "useState", "useMemo"],
    answer: "useState"
  }
];

export default function TakeQuiz({ params }) {
  const router = useRouter();

  // Sabhi states quiz ko manage karne ke liye
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Component load hote hi localStorage se data lane ke liye useEffect
  useEffect(() => {
    const savedQuizzes = localStorage.getItem('customQuizzes');
    if (savedQuizzes) {
      const parsed = JSON.parse(savedQuizzes);
      // Agar user ne khud ke questions banaye hain toh wo dikhao, nahi toh default
      setQuizQuestions(parsed.length > 0 ? parsed : defaultQuestions);
    } else {
      setQuizQuestions(defaultQuestions);
    }
  }, []);

  // Next button click hone par score calculate karne ka logic
  const handleNext = () => {
    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    // Agar aage aur questions hain toh agle par jao, nahi toh result dikhao
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); // Naye question ke liye option reset
    } else {
      setShowResult(true);
    }
  };

  // Quiz ko fir se shuru karne ke liye function
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  if (quizQuestions.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading Questions...</p>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' }}>
        <h3 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '20px' }}>My Quiz App</h3>

        {/* Conditional Rendering: Agar result nahi dikhana hai toh sawaal dikhao */}
        {!showResult ? (
          <div>
            <p style={{ fontWeight: 'bold', color: '#666' }}>Question {currentQuestion + 1} of {quizQuestions.length}</p>
            <p style={{ fontSize: '18px', margin: '20px 0', fontWeight: '500' }}>{quizQuestions[currentQuestion].question}</p>

            {/* Options ko map function se screen par render kar rahe hain */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '12px',
                    margin: '5px 0',
                    textAlign: 'left',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: selectedOption === option ? '2px solid #0070f3' : '1px solid #ccc',
                    backgroundColor: selectedOption === option ? '#e6f0ff' : 'white',
                    fontWeight: selectedOption === option ? '600' : 'normal'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Next button tabhi chalega jab koi option select hoga */}
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: 'none',
                color: 'white',
                fontWeight: 'bold',
                backgroundColor: selectedOption === null ? '#ccc' : '#0070f3',
                cursor: selectedOption === null ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        ) : (
          /* Quiz khatam hone ke baad yeh section dikhega */
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#0070f3', marginBottom: '20px' }}>Quiz Complete! 🎉</h2>
            
            <div style={{ 
              background: '#f9f9f9', 
              padding: '20px', 
              borderRadius: '10px', 
              margin: '0 auto 20px auto',
              border: '1px solid #eee'
            }}>
              <p style={{ fontSize: '18px', margin: '10px 0', color: '#333' }}>
                Total Questions: <strong>{quizQuestions.length}</strong>
              </p>
              <p style={{ fontSize: '18px', margin: '10px 0', color: 'green' }}>
                Correct Answers : <strong>{score}</strong>
              </p>
              <p style={{ fontSize: '18px', margin: '10px 0', color: 'red' }}>
                False Answers : <strong>{quizQuestions.length - score}</strong>
              </p>
            </div>

            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '20px 0', color: '#333' }}>
              Aapka Total Score: {Math.round((score / quizQuestions.length) * 100)}%
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button 
                onClick={handleRestart} 
                style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#0070f3', color: 'white', cursor: 'pointer', fontWeight: '500' }}
              >
                Restart Quiz
              </button>
              
              <Link href="/">
                <button style={{ padding: '10px 20px', backgroundColor: '#666', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
                  Home
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}