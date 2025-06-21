import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 👈 Add this

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // ✅ After successful login/signup → Go to Role Selection page
      navigate('/select-role');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-950 text-white flex items-center justify-center px-4">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-blue-800 text-white border border-blue-700 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-blue-800 text-white border border-blue-700 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-900 py-2 rounded hover:bg-blue-100 font-semibold transition"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <p
          className="mt-4 text-center cursor-pointer text-blue-300 hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'New here? Create an account' : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
