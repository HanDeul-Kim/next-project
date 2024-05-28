'use client'
import { signIn, signOut} from 'next-auth/react'

export default function LogoutBtn() {
    return (
        <>
            <div className="user-info">
                <button onClick={ () => { signOut() }}>로그아웃</button>   
            </div>
        </>
    )
}

