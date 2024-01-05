'use client'
import { useRouter } from "next/navigation"
import { signIn, signOut } from 'next-auth/react'

export default function Fail({ type }) {
    const router = useRouter();
    
    if (type === "infoError") {
        alert('글 작성자만 수정 가능합니다! 😅')
        router.push('/list');
    } else if (type === "loginError") {
        signIn();
    }

    return null;
}
