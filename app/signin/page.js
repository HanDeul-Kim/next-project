'use client'
import React, { signIn } from "next-auth/react"
import { useRef } from "react"
export default function Login() {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)


    const handLeSubmit = async () => {
        const result = await signIn("credentials", {
            username: emailRef.current,
            password: passwordRef.current,
            redirect: true,
            callbackUrl: "/",
        });

    }
    const handleSignIn = async (provider) => {
        await signIn(provider);
    };

    return (
        <div>
            <button onClick={() => { handleSignIn('github') }}>깃허브 로그인</button>
            <button onClick={() => { handleSignIn('github') }}>카카오 로그인</button>
            <button onClick={() => { handleSignIn('github') }}>네이버 로그인</button>
        </div>

    )

}