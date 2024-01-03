'use client'
// import {useRouter} from "next/navigation"
import { signIn, signOut} from 'next-auth/react'
import { useEffect } from 'react'
export default function Check() {
    // const router = useRouter();
    
    // alert('로그인을 먼저 해주세요!')
    // router.push('/signin');
    useEffect( () => {
        signIn(null, { callbackUrl: "/" })
    }, [])
    // 왜 재렌더링 될까
}


