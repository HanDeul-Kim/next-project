'use client'

import { useRouter } from "next/navigation"

export default function Fail() {
    const router = useRouter();
    {
        alert('글 작성자만 수정 가능합니다! 😅')
        router.push('/list');
    }

    return null;
}