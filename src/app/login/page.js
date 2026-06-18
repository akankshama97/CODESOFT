'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aapke screenshot ke mutabik credentials check
    if (email === 'abc@gmail.com' && password === '1234567') {
      alert('Login successful!');
      
      // Submit hote hi main home page par bhejne ke liye
      router.push('/'); 
    } else {
      alert('Galat Email ya Password!');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Enter Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              required
              className="w-full rounded border border-gray-300 p-3 text-base outline-none focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-600">
              Enter Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="1234567"
              required
              className="w-full rounded border border-gray-300 p-3 text-base outline-none focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-3 text-base font-bold text-white hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}