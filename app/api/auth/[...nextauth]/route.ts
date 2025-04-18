import NextAuth, { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { AdapterUser } from 'next-auth/adapters'
import bcrypt from 'bcrypt'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { prisma } from '@/app/lib/db'

interface CustomJWT extends JWT {
  isAdmin?: boolean
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('Test from authorize *-*')
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin ?? false, // ✅ include this here
        };
      }
    })

  ],
  // Special functions that let you intercept and customize the authentication flow
  callbacks: {
    // The jwt callback is called right after a user signs in & every time a token is created or updated
    async jwt({ token, user }: { token: JWT, user?: User | AdapterUser }) {
      if (user) token.isAdmin = (user as AdapterUser).isAdmin ?? false
      return token
    },
    // Runs when a session is created (i.e. someone visits a page and you're using useSession())
    // It takes the JWT token and creates the session object
    async session({ session, token }: { session: Session, token: CustomJWT }) {
      if (session?.user) {
        session.user.isAdmin = token?.isAdmin ?? false;
      }
      return session;
    }
  },
  pages: { signIn: '/signin' },
  adapter: PrismaAdapter(prisma)
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }