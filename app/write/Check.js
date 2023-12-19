'use client'
import {useRouter} from "next/navigation"
export default function Check() {
    const router = useRouter();
    
    alert('로그인을 먼저 해주세요!')
    router.push('api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F');
}



