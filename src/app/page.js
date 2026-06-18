'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '100px', 
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#333' }}>My Quiz App</h1>
      <p style={{ color: '#666' }}>Apna quiz start karein ya naya quiz banayein!</p>
      <p style={{color: '#28A745'}}>Login user</p>

      {/* Buttons Container */}
      <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
        {/* Yeh button aapko quiz wale page par le jayega */}
        <Link href="/quiz/1">
          <button style={{ 
            padding: '12px 24px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}>
            Take Quiz
          </button>
        </Link>

        {/* Yeh button aapko quiz create karne wale page par le jayega */}
        <Link href="/create-quiz">
          <button style={{ 
            padding: '12px 24px', 
            backgroundColor: '#4caf50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}>
            Create Quiz
          </button>
        </Link>
      </div>

      {/* Yeh button login page ke liye */}
      <Link href="/login" style={{ textDecoration: 'none' }}>
        <button style={{ 
          color: '#0070f3', 
          backgroundColor: 'transparent',
          border: 'none',
          textDecoration: 'underline', 
          marginTop: '40px', 
          cursor: 'pointer',
          fontSize: '16px'
        }}>
          Go To Login Page
        </button>
      </Link>
    </div>
  );
}