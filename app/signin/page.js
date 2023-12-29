'use client'
import React, { signIn } from "next-auth/react"
// import { useRef } from "react"
export default function Login() {

    // const emailRef = useRef(null)
    // const passwordRef = useRef(null)


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

    const handleSignIn = async (provider) => {
        await signIn(provider, { callbackUrl: '/' })
    };

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
            </div>

        </div>
    )
}
import Layout from "components/layouts/layout";

export default function App({ Component, pageProps }: AppProps) {
  switch (pageProps.layout) {
    case "login": {
      return <Component {...pageProps} />;
    }
    default: {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }
  }
}