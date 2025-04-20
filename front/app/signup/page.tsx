'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MD5 from 'crypto-js/md5';

export default function SignupPage() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [uname, setUname] = useState('');
  const [upassword, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch('http://localhost:8000/user/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'register',
        fname,
        lname,
        uname,
        upassword: MD5(upassword).toString(),
      }),
    });

    const data = await res.json();
    if (data.resultCode === 200) {
      alert('Please verify your email before logging in!');
      router.push('/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 space-y-6">
        <h1 className="text-3xl font-bold text-yellow-600 text-center">🍕 YODO Signup</h1>
        <input
          type="text"
          placeholder="First Name"
          className="w-full p-3 rounded-xl border border-gray-300"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-3 rounded-xl border border-gray-300"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl border border-gray-300"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl border border-gray-300"
          value={upassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-xl font-semibold"
        >
          Sign Up
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-yellow-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}