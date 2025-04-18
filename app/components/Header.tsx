'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useCart } from '../hooks/useCart'

export function Header() {
  const { data: session } = useSession()
  const { state } = useCart()

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  // Function to handle clearing the cart when signing out

  const handleSignOut = () => {
    signOut({
      redirect: false, // Prevent automatic redirection
      callbackUrl: '/signin', // Manually handle redirection
    }).then(() => {
      // Redirect manually after signout is successful
      window.location.href = '/signin';
    }).catch((error) => {
      console.error('Sign-out failed:', error);
    });
  }


  return (
    <header className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <div>
        <h1 className='text-xl font-bold'>
          <Link href='/'>Restaurant Website</Link>
        </h1>
      </div>

      <nav className='flex items-center space-x-4 bg-red-400'>
        {session && (
          <Link href='/orders' className='hover:underline'>
            Your Orders
          </Link>
        )}

        {!session ? (
          <div>
            <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded' onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        ) : (
          <div className='flex items-center'>
            <Link href='/checkout' className='relative hover:underline'>
              🛒
              {totalItems > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {totalItems}
                </span>
              )}
            </Link>
            <div className='flex items-center space-x-4'>
              <span>Welcome, {session.user?.name || session.user?.email}</span>
              <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded' onClick={handleSignOut}>
                Sign out
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
