import React, { useState } from "react";
import { auth, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, pass);
        alert("Login successful ✅");
      } else {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("Signup successful ✅");
      }
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Google Login successful ✅");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleAuth}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Signup"}
      </h2>
      <input
        className="w-full p-2 border mb-4 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border mb-4 rounded"
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isLogin ? "Login" : "Signup"}
      </button>

      <button
        type="button"
        onClick={handleGoogle}
        className="w-full mt-3 bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Continue with Google
      </button>

      <p
        className="mt-4 text-center text-sm text-blue-500 cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "New user? Signup here"
          : "Already have an account? Login"}
      </p>
    </form>
  );
};

export default AuthForm;
