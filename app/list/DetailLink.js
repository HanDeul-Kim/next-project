'use client'
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

export default function DetailLink() {

    let router = useRouter();

    // 현재 url 출력
    let a = usePathname();
    // search params
    let b = useSearchParams()
    // 유저가 [dynamic route 입력한 것 출력]
    let c = useParams

    return (
        <button onClick={ () => {
            console.log(a)
            console.log(b)
            console.log(c)
        }}>버튼</button>
    )
}


