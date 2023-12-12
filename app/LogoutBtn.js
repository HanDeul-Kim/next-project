'use client'
import { signIn, signOut} from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
export default async function LogoutBtn() {
    let session = await getServerSession(authOptions)
    return (
        <>
            <div className="user-info">
                <img className="profile-img" src={session.user.image} alt="" />
                <div className='welcome'><b>{session.user.name}</b>님 환영합니다!</div>
                <button onClick={ () => { signOut() }}>로그아웃</button>   
            </div>
        </>
    )
}