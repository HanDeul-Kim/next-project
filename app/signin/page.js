'use client'
import React, { signIn } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
export default function Login() {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)


    // const handLeSubmit = async () => {
    //     const result = await signIn("credentials", {
    //         username: emailRef.current,
    //         password: passwordRef.current,
    //         // redirect: true,
    //         redirect: {destination: "/"},
    //         callbackUrl: "/",
    //     });
    // }

    // const handleSignIn = async (provider) => {
    //     await signIn(provider);
    // };

    // 소셜 로그인 
    const handleSignIn = async (provider) => {
        await signIn(provider, { callbackUrl: '/' })

        // const router = useRouter();
        // router.push('/');
    };
    // 사용자 정의 로그인 활성화
    // const handleSubmit = async () => {
    //     // console.log(emailRef.current)
    //     // console.log(passwordRef.current)
    //     const result = await signIn("credentials", {
    //         username: emailRef.current,
    //         password: passwordRef.current,
    //         redirect: true,
    //         callbackUrl: "/",
    //     });
    // }
    const router = useRouter();
    return (
        <div className="layout-lg">
            <div className="layout-inner">
                <div className="login-wrapper">
                    <h1>간편로그인 후<br></br>이용이<br></br>가능합니다.</h1>
                    <div className="login-wrap">
                        <button className="github" onClick={() => { handleSignIn('github') }}>
                            <img src="./github.png" alt="" />
                            <span>깃허브 로그인</span>
                        </button>
                        <button className="kakao" onClick={() => { handleSignIn('kakao') }}>
                            <img src="./kakao.png" alt="" />
                            <span>카카오 로그인</span>
                        </button>
                        <button className="naver" onClick={() => { handleSignIn('naver') }}>
                            <img src="./naver.png" alt="" />
                            <span>네이버 로그인</span>
                        </button>
                    </div>
                </div>
                <a className="page_back" href="/">
                    <img src="./arrow_back.png" alt="" />
                    <span>Back</span>
                </a>
            </div>
            {/* 사용자 정의 로그인 활성화*/}
            {/* <main className="">
                <h1 className="">Login</h1>
                <div>
                    <div>
                        <label
                            htmlFor="email"
                            className=""
                        >
                            Email
                        </label>

                        <div className="">
                            <input
                                ref={emailRef}
                                onChange={e => {
                                    emailRef.current = e.target.value
                                }}
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoFocus={true}
                                className=""
                            />
                        </div>
                    </div>

                    <div className="">
                        <label
                            htmlFor="password"
                            className=""
                        >
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                ref={passwordRef}
                                onChange={e => (passwordRef.current = e.target.value)}
                                className=""
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleSubmit}
                            className=""
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </main> */}
        </div>
    )
}