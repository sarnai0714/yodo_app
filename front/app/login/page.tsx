'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MD5 from 'crypto-js/md5';

export default function LoginPage() {
  const [uname, setUname] = useState('');
  const [upassword, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:8000/user/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'login',
        uname,
        upassword: MD5(upassword).toString(),
      }),
    });

    const data = await res.json();
    if (data.resultCode === 1002) {
      localStorage.setItem('user', JSON.stringify(data.data[0]));
      router.push('/');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-orange-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 space-y-6">
        <h1 className="text-3xl font-bold text-orange-600 text-center">🍔 YODO Login</h1>
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
          onClick={handleLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl font-semibold"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-orange-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
