import { Inter } from 'next/font/google'
import Link from "next/link"
import './globals.css'
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import Profile from './ProfileGallery'
import LoginInfo from './LoginInfo'
import { headers } from 'next/headers';
import { signIn, signOut } from 'next-auth/react'
import Nav from './nav'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions)
  // console.log(session);
  // next.js 미들웨어
  const headersList = headers();
  const headerPathname = headersList.get('x-pathname') || "";
  return (
    <html lang="en">
      <body className=
        {
          // inter.className
          headerPathname === '/signin' ? `${inter.className} login-full` : null
        }>
        {
          session === null ?
            false
            :
            <Profile session={session} />
        }
        {
          headerPathname === '/signin' ?
            null
            :
            <Nav></Nav>
        }
        {children}
      </body>
    </html>
  )
}

