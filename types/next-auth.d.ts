// types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      isAdmin?: boolean // ✅ Add your custom field
    }
  }

  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      isAdmin?: boolean // ✅ custom property
    }
  }

  interface User {
    isAdmin?: boolean // ✅ Also extend the User type
  }
}
