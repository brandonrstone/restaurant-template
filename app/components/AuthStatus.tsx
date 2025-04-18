'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthStatus() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

  return <button onClick={() => signIn()}>Sign in</button>
}
