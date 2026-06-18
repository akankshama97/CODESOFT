'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateQuiz() {
  const router = useRouter();
  
  // State variables - har ek input field ka data store karne ke liye
  const [question, setQuestion] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  // Form submit hone par chalne wala function
  const handleSubmit = (e) => {
    e.preventDefault(); // Page reload hone se rokne ke liye
    
    // Validation: Check kar rahe hain ki koi field khali toh nahi hai
    if(!question || !opt1 || !opt2 || !opt3 || !opt4 || !correctAnswer) {
      alert("Saari fields bharna zaroori hai!");
      return;
    }

    // Ek naya quiz object taiyar kiya
    const newQuizItem = {
      id: Date.now(), // Unique ID dene ke liye current timestamp use kiya
      question: question,
      options: [opt1, opt2, opt3, opt4],
      answer: correctAnswer
    };

    // LocalStorage se purane save kiye hue quizzes nikal rahe hain
    const existingQuizzes = localStorage.getItem('customQuizzes');
    
    // Agar pehle se data hai toh use array mein convert karenge, nahi toh khali array banayenge
    const quizList = existingQuizzes ? JSON.parse(existingQuizzes) : [];
    
    // Naya question list mein add kiya
    quizList.push(newQuizItem);

    // Update kiye hue list ko wapas localStorage mein string banakar save kar diya
    localStorage.setItem('customQuizzes', JSON.stringify(quizList));
    
    alert("Naya Question Sahi Se Add Ho Gaya!");
    
    // Kaam khatam hone ke baad user ko home page par bhej diya
    router.push('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px 0', fontFamily: 'sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '450px' }}>
        <h2 style={{ textAlign: 'center', color: '#4caf50', marginBottom: '20px' }}>📝 Create New Quiz Question</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Sawaal poochne ka input */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Question:</label>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} placeholder="Apna sawaal likhein" />
          </div>

          {/* Chaar options ke inputs */}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Option 1:</label>
            <input type="text" value={opt1} onChange={(e) => setOpt1(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Option 2:</label>
            <input type="text" value={opt2} onChange={(e) => setOpt2(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Option 3:</label>
            <input type="text" value={opt3} onChange={(e) => setOpt3(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Option 4:</label>
            <input type="text" value={opt4} onChange={(e) => setOpt4(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>

          {/* Sahi jawab check karne ke liye input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: 'red' }}>Correct Answer (Exact match hona chahiye):</label>
            <input type="text" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} placeholder="Sahi option text paste karein" />
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginBottom: '10px' }}>Save Question</button>
          <Link href="/"><button type="button" style={{ width: '100%', padding: '12px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>Back to Home</button></Link>
        </form>
      </div>
    </div>
  );
}