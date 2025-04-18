// app/auth/signin/page.tsx

'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'

/*
  A few notes:
  The signIn() function does a full page redirect by default if the login is successful.
  If you want to stay on the same page and handle errors manually (like showing a toast if credentials fail), you can pass redirect: false too, like this:
*/

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { data } = useSession()

  console.log(data?.user)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-black bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">Or</span>
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="text-sm text-blue-500 hover:underline"
          >
            Sign in with Google
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <span>Don't have an account? </span>
          <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}
