'use client'
import { signIn, signOut} from 'next-auth/react'
import { useRouter } from "next/navigation"

export default function LoginBtn() {
    // const router = useRouter();
    return (
        // <button onClick={ () => { router.push('/signin') }}>로그인</button>
        <button onClick={ () => { signIn() }}>로그인</button>
    )
}
