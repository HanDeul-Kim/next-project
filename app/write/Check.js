'use client'
import { useEffect, useState } from "react"
import {useRouter} from "next/navigation"
export default function Check() {
    const router = useRouter();
    
    alert('로그인을 먼저 해주세요!')
    router.push('/');
}

